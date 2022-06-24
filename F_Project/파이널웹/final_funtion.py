import json
import plotly.express as px
import pandas as pd
import numpy as np
from flask import Flask, make_response, jsonify, request, render_template
import cx_Oracle
import sqlalchemy as sa
from flask_cors import CORS, cross_origin
from plotly.subplots import make_subplots
import plotly.graph_objects as go
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import pandas as pd
import json
import plotly
import ast



def 투자유형별차트띄우기(투자유형):

    # 2. 데이터베이스 연결
    #db = pymysql.connect(host='localhost', port=3306, user='ctrlenter', password='0000', db='ctrlenter',
    #                     charset='utf8')  # charset: 인코딩 설정

    # 3. curosr 사용
    #cursor = db.cursor()

    #sql = 'select * from ' + 투자유형
    #test = pd.read_sql(sql, db)
    if 투자유형=='안정형':
        test = pd.read_csv('./전체가격데이터/전체1가격데이터.csv')
    elif 투자유형=='적극투자형':
        test = pd.read_csv('./전체가격데이터/전체19가격데이터.csv')
    elif 투자유형 == '위험중립형':
        test = pd.read_csv('./전체가격데이터/전체13가격데이터.csv')
    elif 투자유형=='안정추구형':
        test = pd.read_csv('./전체가격데이터/전체7가격데이터.csv')
    elif 투자유형=='공격투자형':
        test = pd.read_csv('./전체가격데이터/전체25가격데이터.csv')


    test.index = test['Date']
    test = test[['kospi', '유동성추이', '레버리지추이', '성장성추이',
                 '수익성추이', '시장가치추이', '활동성추이', '그레이엄추이', '린치추이', '버핏추이', '삼대투자추이']].pct_change(1).cumsum()*100
    test.columns = ['인덱스투자전략', '유동성전략', '레버리지전략', '성장성전략',
                 '수익성전략', '시장가치전략', '활동성추이', '그레이엄전략', '린치전략', '버핏전략', '삼대투자전략']


    # print(test.columns.tolist())
    price_rank = test.iloc[-1].rank(method='min', ascending=False)
    price_rank = price_rank.sort_values(ascending=True)
    rank_index = price_rank.tolist()
    price_rank_name = price_rank.index.tolist()
    price_list = test.iloc[-1].sort_values(ascending=False).tolist()
    if 투자유형 in ['적극투자형','공격투자형']:
        price_rank_name.remove('인덱스투자전략')
    chart = test[price_rank_name[:4]]
    chart['평균수익률'] = chart.sum(axis=1) / 4
    su_mean = round(chart['평균수익률'].iloc[-1],2)
    chart=chart.drop('평균수익률',axis=1)


    chart['kospi지수'] = (np.exp(pd.read_csv('./전체가격데이터/전체1가격데이터.csv').set_index('Date')['ksp로그']) - 1).cumsum() * 100

    # making dual axis and defining categories

    fig = make_subplots(specs=[[{"secondary_y": True}]])

    # creating first plot
    fig.add_trace(
        go.Scatter(x=chart.index, y=chart[chart.columns.tolist()[0]], name=chart.columns.tolist()[0]),
        secondary_y=False,
    )

    # creating next plot
    fig.add_trace(
        go.Scatter(x=chart.index, y=chart[chart.columns.tolist()[1]], name=chart.columns.tolist()[1]),
        secondary_y=False,
    )

    # creating next plot
    fig.add_trace(
        go.Scatter(x=chart.index, y=chart[chart.columns.tolist()[2]], name=chart.columns.tolist()[2]),
        secondary_y=False,
    )
    # creating next plot
    fig.add_trace(
        go.Scatter(x=chart.index, y=chart[chart.columns.tolist()[3]], name=chart.columns.tolist()[3]),
        secondary_y=False,
    )

    # creating next plot
    fig.add_trace(
         go.Scatter(x=chart.index, y=chart[chart.columns.tolist()[4]], name=chart.columns.tolist()[4]) ,
         secondary_y=False,
     )

    fig.update_layout(height=600, width=1260,plot_bgcolor="white")
    fig.update_layout(height=600, width=1260, legend=dict(
        orientation="h",
        yanchor="bottom",
        y=1.02,
        xanchor="right",
        x=0.45
    ))

    fig.update_xaxes(showgrid=False)
    fig.update_yaxes(showgrid=True,gridwidth=0.01,gridcolor='whitesmoke')
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    # fig.show()

    return rank_index, price_rank_name, price_list, chart, graphJSON, su_mean

def 투자유형별투자비중(투자유형):

    # 2. 데이터베이스 연결
    #db = pymysql.connect(host='localhost', port=3306, user='ctrlenter', password='0000', db='ctrlenter',
    #                     charset='utf8')  # charset: 인코딩 설정

    # 3. curosr 사용
    #cursor = db.cursor()

    #sql = 'select * from ' + 투자유형
    #test = pd.read_sql(sql, db)
    if 투자유형=='안정형':
        test = pd.read_csv('./전체가격데이터/전체1가격데이터.csv')
    elif 투자유형=='적극투자형':
        test = pd.read_csv('./전체가격데이터/전체19가격데이터.csv')
    elif 투자유형 == '위험중립형':
        test = pd.read_csv('./전체가격데이터/전체13가격데이터.csv')
    elif 투자유형=='안정추구형':
        test = pd.read_csv('./전체가격데이터/전체7가격데이터.csv')
    elif 투자유형=='공격투자형':
        test = pd.read_csv('./전체가격데이터/전체25가격데이터.csv')


    test.index = test['Date']

    my_dict = {'단기채권': round(test['단기채w'].iloc[-1]*100,2),
               '장기채권': round(test['중기채w'].iloc[-1]*100,2),
               '국내 주식': round(test['kspw'].iloc[-1]*100,2),
               '나스닥': round(test['nsdw'].iloc[-1]*100,2),
               '부동산ETF': round(test['vnqw'].iloc[-1]*100,2),
               '원자재ETF': round(test['dbcw'].iloc[-1]*100,2),
               '금': round(test['iauw'].iloc[-1]*100,1)}
    sorted_dict = sorted(my_dict.items(), key=lambda item: item[1], reverse=True)
    my_list=[sorted_dict[0][0],sorted_dict[0][1],sorted_dict[1][0],sorted_dict[1][1],sorted_dict[2][0],sorted_dict[2][1],
      sorted_dict[3][0],sorted_dict[3][1],sorted_dict[4][0],sorted_dict[4][1],sorted_dict[5][0],sorted_dict[5][1],
      sorted_dict[6][0],sorted_dict[6][1]]

    return my_list


def 올해연도종목_list꺼내기(코스피제외가격추이):

    # 2. 데이터베이스 연결
    #db = pymysql.connect(host='localhost', port=3306, user='ctrlenter', password='0000', db='ctrlenter', charset='utf8')   # charset: 인코딩 설정

    # 3. curosr 사용
    #cursor = db.cursor()

    #sql = 'select * from 총기법종목수익률최종선정_10종목'
    #test = pd.read_sql(sql, db)
    test = pd.read_csv('./전체가격데이터/총기법종목수익률최종선정_10종목.csv')
    코스피제외가격추이4개 = 코스피제외가격추이[:4]
    test['재무비율방식'] = test['재무비율방식'].str.replace(r'[투자종목]',repl=r'',regex=True)
    test['추이'] = '추이'
    test['추이']
    test['재무비율방식'] = test['재무비율방식'].str.cat(test['추이'],sep='')

    종목_list = []
    for name in 코스피제외가격추이4개:

        종목 = test['포트폴리오종목명'][(test['연도']==2022) & (test['재무비율방식']==name)]
        종목 = 종목.tolist()
        종목 = ast.literal_eval(종목[0])
        종목_list.append(종목)

    return 코스피제외가격추이4개, 종목_list


def 뉴스지수():
    뉴스지수 = pd.read_excel('./뉴스지수.xlsx')
    fig= px.line(뉴스지수,x='index',y='뉴스지수')
    fig.update_layout(height=300, width=786,plot_bgcolor="white")

    fig.update_xaxes(showgrid=False)
    fig.update_yaxes(showgrid=True,gridwidth=0.01,gridcolor='whitesmoke')
    fig.update_layout(
        xaxis_title="", yaxis_title=""
    )
    graphJSON1 = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON1



def 올해연도종목_list꺼내기(투자성향):
    안정형 = ['린치추이', '시장가치추이', '그레이엄추이', '삼대추이', '버핏추이', '유동성추이', '성장성추이', '레버리지추이', '활동성추이', '수익성추이']
    안정추구형 = ['린치추이', '시장가치추이', '그레이엄추이', '삼대추이', '버핏추이', '유동성추이', '성장성추이', '레버리지추이', '활동성추이', '수익성추이']
    위험중립형 = ['린치추이', '시장가치추이', '그레이엄추이', '버핏추이', '삼대추이', '유동성추이', '성장성추이', '레버리지추이', '활동성추이', '수익성추이']
    적극투자형 = ['린치추이', '시장가치추이', '버핏추이', '유동성추이', '그레이엄추이', '삼대추이', '성장성추이', '레버리지추이', '수익성추이', '활동성추이']
    공격투자형 = ['린치추이', '시장가치추이', '버핏추이', '그레이엄추이', '유동성추이', '삼대추이', '성장성추이', '레버리지추이', '활동성추이', '수익성추이']

    if 투자성향 == '안정형':

        투자성향 = 안정형
        전략이름_list= 안정형

    elif 투자성향 == '안정추구형':

        투자성향 = 안정추구형
        전략이름_list = 안정추구형

    elif 투자성향 == '위험중립형':

        투자성향 = 위험중립형
        전략이름_list = 위험중립형

    elif 투자성향 == '적극투자형':

        투자성향 = 적극투자형
        전략이름_list = 적극투자형

    else:

        투자성향 = 공격투자형
        전략이름_list = 공격투자형
    # 2. 데이터베이스 연결
    #db = pymysql.connect(host='localhost', port=3306, user='ctrlenter', password='0000', db='ctrlenter',
    #                     charset='utf8')  # charset: 인코딩 설정

    # 3. curosr 사용
    #cursor = db.cursor()

    #sql = 'select * from 총기법종목수익률최종선정_10종목'
    #test = pd.read_sql(sql, db)
    test = pd.read_csv('./전체가격데이터/총기법종목수익률최종선정_10종목.csv')

    test['재무비율방식'] = test['재무비율방식'].str.replace(r'[투자종목]', repl=r'', regex=True)
    test['추이'] = '추이'
    test['재무비율방식'] = test['재무비율방식'].str.cat(test['추이'], sep='')

    극안전형 = ['린치추이', '시장가치추이', '그레이엄추이', '삼대추이', '버핏추이', '유동성추이', '성장성추이', '레버리지추이', '활동성추이', '수익성추이']
    안정추구형 = ['린치추이', '시장가치추이', '그레이엄추이', '삼대추이', '버핏추이', '유동성추이', '성장성추이', '레버리지추이', '활동성추이', '수익성추이']
    위험중립형 = ['린치추이', '시장가치추이', '그레이엄추이', '버핏추이', '삼대추이', '유동성추이', '성장성추이', '레버리지추이', '활동성추이', '수익성추이']
    적극투자형 = ['린치추이', '시장가치추이', '버핏추이', '유동성추이', '그레이엄추이', '삼대추이', '성장성추이', '레버리지추이', '수익성추이', '활동성추이']
    공격투자형 = ['린치추이', '시장가치추이', '버핏추이', '그레이엄추이', '유동성추이', '삼대추이', '성장성추이', '레버리지추이', '활동성추이', '수익성추이']

    종목_list = []
    for i, name in enumerate(투자성향):
        종목 = test['포트폴리오종목명'][(test['연도'] == 2022) & (test['재무비율방식'] == 투자성향[i])]
        종목 = 종목.tolist()
        종목 = ast.literal_eval(종목[0])
        종목_list.append(종목)

    return 종목_list, 전략이름_list

def slice(str):
    str=str[:-2]
    str=str+" 전략"
    return str

















