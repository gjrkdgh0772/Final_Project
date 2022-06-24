import json
import pickle
import pandas as pd
from flask import Flask, make_response, jsonify, request, render_template
import cx_Oracle
import sqlalchemy as sa
from flask_cors import CORS, cross_origin
import requests
import json
import plotly
import plotly.express as px
from final_funtion import *



# ------------------------------------
#pip install flask_cors
# import flask_cors CORS, cross_origin
# CORS(app)
# CORS(app, resources={r'*': {'origins': '*'}})
# ------------------------------------



app = Flask(__name__, template_folder="template", static_folder="static")
CORS(app)


@app.route('/')
def index():

    return render_template("index.html")


@app.route('/portfolio')
def portfolio():

    return render_template("portfolio.html")

@app.route('/human')
def human():

    return render_template("human.html")

@app.route('/serviceinfo')
def serviceinfo():

    return render_template("serviceinfo.html")

@app.route('/survey')
def survey():

    return render_template("survey.html")






#---------------- 업체이름을 타이핑할때마다 실시간 비동기로 업체 명단을 가져와서 리턴 -----------
@app.route('/qform_post', methods=['GET'])
def qform_post():
    qlist_str = request.args.get('qlist')
    qlist = qlist_str.split(",")
    qlist = list(map(int, qlist))
    qlist.append(sum(qlist))

    # load the model
    model = pickle.load(open("model.pkl", "rb"))
    투자유형_list = ['안정형', '적극투자형', '위험중립형', '안정추구형', '공격투자형']


    contents_list=[
        '안정형 투자자는 원금 손실의 최소화를 중시합니다.<br>예금 또는 적금 수준의 수익율을 기대하며, 투자원금에 손실이 발생하는 것을 원하지 않습니다.<br>대부분 기대수익률이 낮더라도 원금손실이 거의 없는 안전한 금융상품에 투자하는 성향의 투자자입니다.',
        '적극투자형 투자자는 시장평균 이상의 고수익을 추구하며 그에 따르는 리스크(자산 가치의 변동 정도)를 감내할 수 있는 투자자입니다.<br>일반적으로 적극투자형 투자자는 장기적인 투자에 있어 원금보존보다 수익률의 극대화를 더 중시하며<br>고위험이지만 잠재적이고 의미 있는 재산증식을 목표로 합니다. 투자자금의 대부분을 주식형 자산 등의 위험자산에 투자할 의향이 있는 투자자입니다.',
        '위험중립형 투자자는 리스크(자산 가치의 변동 정도)감소와 수익 추구를 동시에 원하는 투자자입니다. <br>장기적인 투자에 있어 중위험 중수익을 감내할 수 있는 투자성향입니다. <br>일반적으로 위험중립형 투자자는 단기 하락을 버티면서 장기적인 성장을 원하며 시장 수준의 수익률을 유지하는 것이 목표입니다. <br>채권형 자산과 같은 안전 자산과 더불어 위험자산인 주식형 자산 또한 상당부분 투자할 의향이 있는 투자자입니다.',
        '안정추구형 투자자는 높은 수익률보다 원금 손실의 최소화를 더 중시합니다.<br>안정성을 위해 낮은 수익률을 수용할 수 있으며, 일반적으로 현재의 생활수준을 방어하기 위한 목표를 가지며 예·적금 +α 수준의 수익률을 기대합니다.<br>손실위험을 최소화하기 위해 이자소득이나 배당소득 중심의 안정적인 포트폴리오를 구성하며 예·적금보다 높은 수익을 위해 자산 중 일부를 변동성 높은 상품에 투자할 의향이 있는 투자자입니다.',
        '공격형 투자자는 시장평균 이상의 고수익을 추구하며 그에 따르는 리스크(자산 가치의 변동 정도)를 감내할 수 있는 투자자입니다.<br> 일반적으로 공격형 투자자는 장기적인 투자에 있어 원금보존보다 수익률의 극대화를 더 중시하며 고위험이지만 잠재적이고 의미 있는 재산증식을 목표로 합니다.<br> 투자자금의 대부분을 주식형 자산 등의 위험자산에 투자할 의향이 있는 투자자입니다.'
    ]

    typ=model.predict(pd.DataFrame(data=[qlist],
                               columns=['1번', '2번', '3번', '4번', '5번', '6번', '7번', '8번', '9번', '10번', '11번', 'score']))

    # 첫번째함수
    rank_index, price_rank_name, price_list, chart, graphJSON,평균수익률 = 투자유형별차트띄우기(투자유형_list[int(typ)])
    #content_list=[]
    graphJSON1=뉴스지수()

    MY_LIST = 투자유형별투자비중(투자유형_list[int(typ)])

    종목_list, 전략이름_list=올해연도종목_list꺼내기(투자유형_list[int(typ)])
    전략이름_list=list(map(slice, 전략이름_list))







    return render_template("result.html",MY_LIST=MY_LIST,
                           graphJSON1=graphJSON1,graphJSON=graphJSON,
                           F_TYPE=투자유형_list[int(typ)],F_CON=contents_list[int(typ)],
                           RTMEAN=평균수익률,
                           STOCK_LIST=종목_list,
                           STR_LIST=전략이름_list)


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8088)

