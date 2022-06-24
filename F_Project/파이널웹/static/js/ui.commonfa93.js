var YT = YT || null, win;
if(typeof console=="undefined"){ console = { log : function(){}, info : function(){}, warn : function(){}, error : function(){} }; }
/* chart 기본설정 Start */
Chart.defaults.global.defaultFontSize = 12;
Chart.defaults.global.defaultFontColor = '#333';
Chart.defaults.global.defaultFontStyle = 'normal';
Chart.defaults.global.defaultFontFamily = "'KBFGText', sans-serif";
Chart.defaults.global.tooltips.titleFontFamily = "'KBFGText', sans-serif";
Chart.defaults.global.tooltips.titleFontStyle = 'normal';
Chart.defaults.global.tooltips.titleMarginBottom = 10;
Chart.defaults.global.tooltips.bodyFontFamily = "'KBFGText', sans-serif";
Chart.defaults.global.tooltips.bodySpacing = 6;
Chart.defaults.global.tooltips.xPadding = 20;
Chart.defaults.global.tooltips.yPadding = 20;
Chart.defaults.global.tooltips.caretPadding = 10;
Chart.defaults.global.legend.display = false;
Chart.defaults.global.elements.line.fill = false; //면일때 true
Chart.defaults.global.elements.line.borderWidth = 2;
Chart.defaults.global.elements.line.tension = 0;
Chart.defaults.global.tooltips.mode = "index";
Chart.defaults.global.tooltips.intersect = false;
Chart.defaults.global.hover.mode = "index";
Chart.defaults.global.hover.intersect = false;
Chart.defaults.global.hover.animationDuration = 50;
Chart.defaults.lineHelper = Chart.defaults.line;
Chart.controllers.lineHelper = Chart.controllers.line.extend({
  draw: function(ease) {
    Chart.controllers.line.prototype.draw.call(this, ease);
    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
      var activePoint = this.chart.tooltip._active[0],
            ctx = this.chart.ctx,
            x = activePoint.tooltipPosition().x,
            topY = this.chart.scales['y-axis-left'].top,
            bottomY = this.chart.scales['y-axis-left'].bottom;
      ctx.save(); // draw line
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#07C';
      ctx.stroke();
      ctx.restore();
    }
  }
});
var chartLinear = Chart.scaleService.getScaleConstructor('linear');
var chartFirstLinear = chartLinear.extend({
  convertTicksToLabels: function() {
    chartLinear.prototype.convertTicksToLabels.call(this);
    this.zeroLineIndex = this.ticksAsNumbers.indexOf(Math.min.apply(null, this.ticksAsNumbers));
  }
});
Chart.scaleService.registerScaleType('firstLine', chartFirstLinear, Chart.scaleService.getScaleDefaults('linear')); //firstLine
/* chart 기본설정 End */

(function(global, ui){
  'use strict';

  win = { h : 0, w : 0, scrolltop : 0, scrollleft : 0, scrolldir : "", size : {header:0, footer:0, headertop:0, footertop:0} };
  var _evt = {
    winclick : function(e){
      var target = e.target.nodeName==="A"||e.target.nodeName==="BUTTON" ? e.target : e.currentTarget, $target = $.$(target), $relele, uipop, toggleclass, blindtitle;
      uipop = target.getAttribute("data-uipop");
      toggleclass = target.getAttribute("data-toggleclass");
      if(toggleclass){
        if(!target.options){
          if(toggleclass=="this"){
            target.options = {"cssname":"active","$target":$target,"closest":null};
          }else{
            target.options = $.extend({}, {"cssname":"active","target":null,"closest":null}, $target.data('toggleclass') || {});
            var $toggleEl;
            if(target.options.closest&&target.options.target) $toggleEl = $target.closest(target.options.closest).find(target.options.target);
            else if(target.options.target) $toggleEl = $(target.options.target);
            else if(target.options.closest) $toggleEl = $target.closest(target.options.closest);
            else $toggleEl = $target;
            target.options.$target = !$toggleEl.length ? $target : $toggleEl;
          }
        }
        target.options.$target && target.options.$target.toggleClass(target.options.cssname).find("[data-act='sorttxt']").each(function(){ this.innerHTML = target.options.$target.is(".active") ? "내림차순" : "오름차순"; });
      }
      blindtitle = target.getAttribute("data-blind-title");
      if(blindtitle) _page.blindtitle.call(target, blindtitle);
      document.focusEl = target;

      if($target.is("[data-anchor]")) anchorani.call(target, e);
      if(uipop){
        $relele = url2el(target, null);
        if(uipop==0 || uipop==1){
          if(!$relele) $relele = $target.closest('[data-uipopset]');
          if($relele.length==0) $relele = null;
          if(!$relele && !window.parent.length) self.close();
          if($relele && uipop==0) $relele.uipop("close");
          if($relele && uipop==1) $relele.uipop("open");
        }else if(uipop!="" && uipop!=undefined){
          var url = target.getAttribute("href") || target.getAttribute("data-url");
          var _data = $.extend([], $target.data("uipop"));
          _data.unshift(url);
          $target.uipop({winpop:_data});
        }
        e && e.preventDefault();
      }
    },
    winresize : function(e, first){
      var _oldWidth = win.w;
      win.h = _page.$win.height();
      win.w = _page.$win.width();
      win.size.header = _page.layout.$header?_page.layout.$header.innerHeight():0;
      win.size.footer = _page.layout.$footer?_page.layout.$footer.innerHeight():0;
      if(!first && _oldWidth!=win.w) swipeset.sizecheck(); //swipe tab

      var _ratio = _page.grid.ratio.el, _size, _ratio_$el;
      if(_ratio.length){
          for(i in _ratio){
            _ratio_$el = $(_ratio[i].gridoption.size.el);
            _size = [_ratio_$el.width(), _ratio_$el.height(), _ratio[i].gridoption.size.h/_ratio[i].gridoption.size.w, _ratio[i].gridoption.size.w/_ratio[i].gridoption.size.h];
            _ratio[i].style.width = _size[0]+"px";
            _ratio[i].style.height = (_size[0]*_size[2])+"px";
            _ratio[i].style.minWidth = (_size[1]*_size[3])+"px";
            _ratio[i].style.minHeight = _size[1]+"px";
          }
      }
    },
    winscroll : function(e, first){
      if(first && first==-1) win.scrolltop -= 1;
      var curscrolltop = _page.$win.scrollTop(), curscrollleft = _page.$win.scrollLeft(), _dir;
      _dir = win.scrolltop>curscrolltop ? "up" : "down";
      if(win.scrolldir!=_dir) _page.$body.replaceClass("(up|down)",_dir);
      win.scrolltop = curscrolltop;
      win.scrollleft = curscrollleft;
      win.scrolldir = _dir;
      if(_page.layout.$header) _page.layout.menu.sc.call(_page.layout);
    },
    doc : function($wrap){
      $wrap.findFilter("input[data-delete='ipt']").off('focus.delbtn blur.delbtn propertychange.delbtn change.delbtn keyup.delbtn paste.delbtn').on('focus.delbtn blur.delbtn propertychange.delbtn change.delbtn keyup.delbtn paste.delbtn', function(e) {
        var $p = $.$(this).closest('[data-delete="wrap"]');
        if($.trim(this.value)=="") $p.removeClass("del-view"); else $p.addClass("del-view");
      }).trigger('blur.delbtn').each(function(){
        var _ = this, _$ = $.$(_), $p = _$.closest('[data-delete="wrap"]');
        $p.find('[data-delete="btn"]').off("click.delbtn").on("click.delbtn", function(e){ _.value="", _$.focus().trigger('change'); return false; });
      });
      $wrap.findFilter("span[data-placeholder='true'], input[data-placeholder='true'], textarea[data-placeholder='true']").off('focus.placeholder blur.placeholder change.placeholder').on('focus.placeholder', function() { $.$(this).removeClass("placeholder"); }).on('blur.placeholder change.placeholder', function() {
        if(this.value||(this.nodeName=="SPAN"&&this.innerHTML.replace(/ */,"")!="")) $.$(this).removeClass("placeholder"); else $.$(this).addClass("placeholder");
      }).trigger('change.placeholder');
      var selectPlaceholder = function(){
        var $this = $.$(this);
        var isEqual = ($.trim($this.find("option").eq(this.selectedIndex).text()).toLowerCase()==$.trim(this.getAttribute("placeholder")).toLowerCase());
        if(isEqual) $this.addClass("placeholder");
        else $this.removeClass("placeholder");
      };
      function selectTab(v){ var _this = this, _data = $.$(this).data("selchange"); _this.loadcount=_this.loadcount||0; _data.conts && $(_data.conts).load(this.value, function(response, status, xhr){ if(status == "error"){ _this.loadcount<500&&selectTab.call(_this); _this.loadcount++; } }); }
      $wrap.findFilter("select[data-placeholder]").each(selectPlaceholder).off("change.placeholder").on("change.placeholder", selectPlaceholder).trigger("change.placeholder");
      $wrap.findFilter("select[data-selchange]").each(selectPlaceholder).off("change.selchange").on("change.selchange", selectTab).trigger("change.selchange");
      $wrap.findFilter("input[data-fakefile='file']").off('change.fakefile').on('change.fakefile', function() {
        var _ = this, _$ = $.$(_);
        _$.trigger('blur.delbtn');
        if($.trim(_.value)=="") _$.parent().removeClass("del-view"), _.$ipt && _.$ipt.val("");
        else _$.parent().addClass("del-view"), _.$ipt && _.$ipt.val(_.value.replace(/.*\\/,""));
      }).trigger('change.fakefile').each(function(){ this.$ipt = $.$(this).parent().find("input[data-fakefile='text']"); });
      $wrap.findFilter("input[data-comma='this'], span[data-comma='this']").numberComma('propertychange.numberComma change.numberComma keyup.numberComma paste.numberComma');
    },
    init : function($wrap, isReInit){
      var _ = this;
      if(!$wrap) $wrap = _page.$body;
      _.doc($wrap); //form event
      if(!isReInit){
        _page.$body.off("click.linkHandler").off("click.linkHandler", "a, button, area").on("click.linkHandler", "a, button, area", _.winclick).off("focus.appFocus blur.appFocus", "input:not([type='checkbox']):not([type='radio']),select,textarea");
        _page.$win.off("resize.layoutsc orientationChange.layoutsc").on("resize.layoutsc orientationChange.layoutsc", _.winresize).trigger("resize.layoutsc", true).off("scroll.layoutsc").on("scroll.layoutsc", _.winscroll).trigger("scroll.layoutsc");
        $("input[data-filter-check]").off('change.filtercheck').on("change.filtercheck", function(){
          if(!this.isSet){
            this.isSet = true;
            var _option = $.$(this).data("filter-check");
            this.$wrap = _option.wrap ? $(_option.wrap) : null;
            if(!this.$wrap.length) this.$wrap = null;
            this.filter = '[data-filter~="'+_option.case+'"]' || null;
          }
          if(!(this.$wrap || this.filter)) return;
          var $visibleWrap = this.$wrap.find(this.filter);
          if(this.checked) this.$wrap.find(this.filter).removeClass("disabled");
          else this.$wrap.find(this.filter).addClass("disabled");
        }).trigger('change.filtercheck');
        setTimeout(function(){ _page.$win.trigger("resize.layoutsc", true).trigger("scroll.layoutsc", true); }, 500);
      }else{
        _page.$win.trigger("resize.layoutsc", true).trigger("scroll.layoutsc", true);
      }
    }
  };
  var _page = {
    $win : $(window), $html : null, $body : null, wintitle : "", scrollcontroller : null, msg : {selected : "선택됨"},
    docTitle : function(doctitle){
      var _winTitle = [doctitle];
      $.each($("[data-addtitle]:visible"), function(){
        var t = this.getAttribute("data-addtitle");
        if(!t || t=="this"||t=="") t = $.$(this).text();
        _winTitle.push(t);
      });
      document.title = _winTitle.join(" > ");
    },
    blindtitle : function(blindid){
      if(!blindid) return;
      var blindtitleEle = document.getElementById(blindid);
      if(blindtitleEle){
        blindtitleEle.innerHTML = $.$(this).attr("title",_page.msg.selected).text();
        $('[data-blind-title="'+blindid+'"]').not(this).attr("title","");
      }
    },
    grid : {
      slide : {
        init : function(_this){
          var $wrap = $.$(_this);
          var _pagination = { el: null, type: null}, isPage = false;
          if(!_this.gridoption) _this.gridoption = {option:{}};
          if(!_this.gridoption.option) _this.gridoption.option = {};
          if($wrap.find(".progressbar").length>0) _pagination = { el: '.progressbar', type: 'progressbar'}, isPage = true;
          if($wrap.find(".swiper-pagination[data-type='bullet']").length>0) _pagination = { el: ".swiper-pagination[data-type='bullet']", bulletElement: 'button', clickable: true}, isPage = true;
          else if($wrap.find(".swiper-pagination:not([data-type='fraction'])").length>0) _pagination = { el: '.swiper-pagination', bulletElement: 'button', clickable: true}, isPage = true;
          if($wrap.find(".swiper-pagination[data-type='fraction']").length>0){
            if(isPage){
              _this.gridoption.option.fraction = { el: ".swiper-pagination[data-type='fraction']", type: 'fraction', renderFraction:function(current, total){ total-=this.gap; return '<span class="swiper-pagination-current">'+Math.min(current, total)+'</span><span class="swiper-pagination-total">'+total+'</span>'}};
              _this.gridoption.option.fraction.gap = $wrap.find(".ty-more").length;
            }else{
              _pagination = { el: ".swiper-pagination[data-type='fraction']", type: 'fraction', renderFraction:function(currentClass, totalClass){return '<span class="' + currentClass + '"></span><span class="' + totalClass + '"></span>'}, formatFractionCurrent: function (num){ return num /*twonum(num)*/}, formatFractionTotal: function (num){ return num /*twonum(num)*/}};
            }
          }
          var _nextEl = $wrap.find(".swiper-button-next").length>0 ? ".swiper-button-next": null;
          var _prevEl = $wrap.find(".swiper-button-prev").length>0 ? ".swiper-button-prev": null;
          if(_this.gridoption.option&&_this.gridoption.option.custom){
            _pagination = { el: _this.gridoption.option.custom, clickable: true, renderBullet: function (index, className){
              return '<button type="button" class="'+className+'">'+($wrap.find(".swiper-slide").eq(index).data("custom")||index)+'</button>'
            }}
          }else if(_this.gridoption.option&&_this.gridoption.option.dotcircle){
            _pagination.renderBullet = function (index, className){
              return '<button type="button" class="'+className+'">'+index+'<span class="circle"><i></i><i></i></span></button>'
            };
          }
          var previewSet = function(){
            var _ = this, $previews = _.$el.find(_.params.preview), previews_idx = [], _html;
            if($previews.length==0) return;
            previews_idx = [_.params.loop&&_.activeIndex==0&&_.params.slidesPerView==1?_.slides.length-3:_.activeIndex-1, _.params.loop&&_.realIndex==0&&_.params.slidesPerView==1?2:_.activeIndex+1];
            $previews.each(function(){
              var $this = $.$(this), isCase = $this.parent().is(".swiper-button-next") ? 1 : 0;
              _html = previews_idx[isCase]>=0 && _.slides.length>previews_idx[isCase] ? _.slides[previews_idx[isCase]].getAttribute("data-preview") : null;
              if($this.find(".js-preview")) $this.find(".js-preview").remove();
              if(_html) $this.append("<div class='js-preview' style='display:none;'>"+_html+"</div>").promise().done(function(){ $this.find(".js-preview").fadeIn(400) });
            });
          };
          var classChange = function(){
            var _ = this;
            if(this.slides[this.activeIndex].getAttribute("data-addclass")){
              this.$el.addClass(this.params.addclass);
            }else{
              this.$el.removeClass(this.params.addclass);
            }
          };
          var fractionSet = function(){
            if(typeof this.params.fraction.el=="string") this.params.fraction.el = this.$el.find(this.params.fraction.el);
            this.params.fraction.el.html(this.params.fraction.renderFraction(this.realIndex+1, this.loopedSlides || this.slides.length));
          };
          var _leng, _lengoption, iscontrol = true, _options, _default = {
            speed: 600, //threshold: 10,
            slidesPerView: 'auto',
            simulateTouch: false,
            pagination: _pagination,
            noSwipingSelector : "button, input, select, textarea",
            navigation: { nextEl: _nextEl, prevEl: _prevEl },
            on: {
              init: function(){
                this.$el.find(".swiper-slide-duplicate").attr("aria-hidden",true).find("a, button").attr("tabindex",-1);
                if((!this.params.loop || this.params.speed==0) && this.params.preview) previewSet.call(this);
                if(this.params.addclass) classChange.call(this);
                if(this.params.fraction) fractionSet.call(this);
              },
              slideChange: function(){
                if(this.params.preview) previewSet.call(this);
                if(this.params.addclass) classChange.call(this);
                if(this.params.fraction) fractionSet.call(this);
              },
              slideNextTransitionStart: function(){
                $.$(this.el).replaceClass("direction\-prev","direction-next");
              },
              slidePrevTransitionStart: function(){
                $.$(this.el).replaceClass("direction\-next","direction-prev");
              }
            }
          };
          _options = $.extend({}, _default, _this.gridoption.option||{});
          if(_options.thumbs&&_options.thumbs.swiper) _options.thumbs.swiper = $(_options.thumbs.swiper).get(0).swiper;
          if(_options.initnum && _options.initnum=="center"){
            _options.initialSlide = Math.floor(_leng/2);
          }
          _leng = $wrap.find(".swiper-slide").length, _lengoption = _options.slidesPerView=="auto" ? 1 : _options.slidesPerView;
          if(_leng<=_lengoption) iscontrol = false;
          if(!iscontrol){
            _options.autoplay = false;
            _options.loop = false;
            _options.pagination = { el: null, bulletElement: null, clickable: null, type: null};
            if(_nextEl||_prevEl) $((_prevEl?_prevEl:"")+(_nextEl&&_prevEl?", ":"")+(_nextEl?_nextEl:"")).addClass("single-disabled");
            $wrap.find(".swiper-button-play").remove();
          }
          _this.swiper = new Swiper(_this, _options);
          $wrap.find(".swiper-button-play").on("click",function(){
            if(_this.swiper.autoplay.running) _this.swiper.autoplay.stop(), $.$(this).addClass("stop");
            else _this.swiper.autoplay.start(), $.$(this).removeClass("stop");
          });
        }
      },
      sliderange : {
        grade : {range: true, min: 1, max: 6, step: 1, tooltip:["매우 높은 위험","높은 위험","다소 높은 위험","보통 위험","낮은 위험","매우 낮음 위험"]},
        num : {range: true},
        handleset : function(handle, value, option){
          var isUi = value[0];
          handle.each(function(ii){
            var _$this, _pos, _state, _val = isUi?(option.range?value[1].values[ii]:value[1].value) : (option.range?value[1].slider("values",ii):value[1].slider("value"));
            _$this = $.$(this);
            _pos = Math.abs((option.min-_val)/option.step);
            _state = option.min==_val ? "first" : (option.max==_val ? "last" : "");
            _$this.find(".amount").val(_val).parent().replaceClass('case-[^ ]*( first)?( last)?','case-'+(_pos+1)+(_state!=""?" "+_state:""));
            option.tooltip && _$this.find(".tooltip").text(option.tooltip[_pos]);
            if(ii==0) _$this.siblings(".ui-slider-range").replaceClass('case-[^ ]','case-'+(_pos+1));
          });
        },
        resetvalue : function(_this){
          if(!_this) return;
          var $wrap = $.$(_this), _isarray, _val = _this.gridoption.option.reset || _this.gridoption.option.values;
          _isarray = _val.length > 1;
          $wrap.slider(_isarray?"values":"value", _val);
        },
        init : function(_this){
          var _ = this, $wrap, handle, _type, _option;
          $wrap = $.$(_this);
          handle = $wrap.find(".ui-slider-handle");
          if(handle.length==0) handle = null;
          _type = _this.gridoption.option.type || "grade";
          _option = _[_type];
          if(_this.gridoption.option.range==undefined) _this.gridoption.option.range = _option.range = _option.range || false;
          else _option.range = _this.gridoption.option.range;
          _option.step = _option.step || null;
          if(_this.gridoption.option.step) _option.step = _this.gridoption.option.step;
          if(_this.gridoption.option.min) _option.min = _this.gridoption.option.min;
          if(_this.gridoption.option.max) _option.max = _this.gridoption.option.max;
          if(!_option.min) _option.min = 0;
          if(!_option.max) _option.max = 0;
          if(_this.gridoption.option.values){
            if(_option.range) _option.values = _this.gridoption.option.values || [_option.min, _option.max];
            else _option.value = _this.gridoption.option.values.length>1 ? _this.gridoption.option.values[0] : (_this.gridoption.option.values || _option.min);
            _this.gridoption.option.values = _option.values ?[_option.values[0], _option.values[1]] : _option.value;
          }
          $wrap.slider({
            range: _option.range, values:_option.range?_option.values:null, value:_option.range?null:_option.value, min: _option.min, max: _option.max, step: _option.step,
            slide: function(event, ui) { handle && _.handleset.call(_, handle, [true, ui], _option); },
            change: function(event, ui) { handle && _.handleset.call(_, handle, [true, ui], _option); },
            create: function() { handle && _.handleset.call(_, handle, [false, $(this)], _option); }
          });
          _this.reset = _.resetvalue.bind(_,_this);
          if(_this.gridoption.option.disable) $wrap.slider({disabled:true});
        }
      },
      aniclass : {
        init : function(_this){
          var classname = _this.gridoption.classname || "ani-visible", _hook = _this.gridoption.hook || 1;
          new ScrollMagic.Scene({triggerElement: _this, triggerHook: _hook})
                .setClassToggle(_this, classname) // add class toggle
                .addTo(_page.scrollcontroller);
        }
      },
      anicount : {
        hidden : function(_this, _value, _max){
          clearTimeout(_this.repeat);
          _this.innerHTML = 0;
        },
        visible : function(_this, _value, _max){
          var _ = this;
          clearTimeout(_this.repeat);
          var _old = Number(_this.innerHTML);
          if(_old == _value) return;
          _this.innerHTML = _old+1;
          _this.repeat = setTimeout(_.visible.bind(_, _this, _value, _max), (_max/_value)*10); //_value>50?20:200
        },
        init : function(_this){
          var _ = this, _hook = _this.gridoption.hook || 1, _value = _this.gridoption.value || 0, _max = _this.gridoption.max || 100;
          _.hidden.call(_, _this, _value);
          _this.repeat = null;
          new ScrollMagic.Scene({triggerElement: _this, triggerHook: _hook})
                .addTo(_page.scrollcontroller).on("enter", _.visible.bind(_, _this, _value, _max)).on("leave", _.hidden.bind(_, _this, _value, _max));
        }
      },
      ratio : {
        el : [],
        init : function(_this){
          var isEl = false, _ = this;
          for(i in _.el){
            if(_.el[i]==_this) return;
          }
          _.el.push(_this);
        }
      },
      footfix : {
        el : [],
        init : function(_this){
          var isEl = false, _ = this;
          for(i in _.el){
            if(_.el[i]==_this) return;
          }
          _.el.push(_this);
          if(_this.getAttribute("data-dropdown")){
            $.$(_this).data("dropdown", {"effect":"slide", "callbackClose":function(){ $(".footer .side-quick").fadeIn(); }, "callbackOpen":function(){ $(".footer .side-quick").fadeOut(); }});
            _page.reInit($.$(_this));
          }
        }
      },
      fundfix : {
        _top : null, _gap : 700, _$obj : null, classname : null,
        fix : function(obj, e){
          var _ = this;
          win.scrollleft = _page.$win.scrollLeft();
          if(!_._$obj) _._$obj = $.$(obj);
          if(!_._top) _._top = _._$obj.offset().top;
          var pos = [_._top+_._gap, _._top+_._$obj.innerHeight()-_._gap], isFix = false;
          if(win.scrolltop >= pos[0] && win.scrolltop <= pos[1]){
            !_._$obj.is("."+_.classname)&&_._$obj.addClass(_.classname).stop().animate({"opacity":1}, 300, "linear", function(){ _._$obj.addClass("show"); });
            isFix = true;
          }else{
            _._$obj.is("."+_.classname)&&_._$obj.removeClass("show").stop().animate({"opacity":1}, 50, "linear", function(){ _._$obj.removeClass(_.classname); });
          }
          if(isFix) !_page.layout.$header.is(".hide")&&_page.layout.$header.addClass("hide");
          else _page.layout.$header.is(".hide")&&_page.layout.$header.removeClass("hide");
          if(_.$fixel) _.$fixel.css({"margin-left":win.scrollleft==0||!isFix?"":(win.scrollleft*-1)+"px"})
        },
        init : function(_this){
          var _ = this;
          _.classname = _this.gridoption.classname || "fixed";
          _.$fixel = _this.gridoption.fixel ? $.$(_this).find(_this.gridoption.fixel) : null;
          if(_.$fixel && _.$fixel.length==0) _.$fixel = null;
          win.scrolltop = _page.$win.scrollTop();
          win.scrollleft = _page.$win.scrollLeft();
          $(window).off("resize.fundlayoutsc orientationChange.fundlayoutsc scroll.fundlayoutsc").on("resize.fundlayoutsc orientationChange.fundlayoutsc scroll.fundlayoutsc", _.fix.bind(_, _this)).trigger("scroll.fundlayoutsc");
        }
      },
      pin : {
        el : [], isSet : false,
        fix : function(e){
          var _ = this, obj, isFix = false, curFix = false;
          win.scrollleft = _page.$win.scrollLeft();
          for(i in _.el){
            obj = _.el[i];
            if(!obj._$obj) obj._$obj = $.$(obj);
            if(obj._$obj.is(":visible")){
              if(!obj._top) obj._top = (obj.$in ? obj.$in.offset().top : obj.$after ? obj.$after.offset().top : obj._$obj.offset().top)+obj.gap.top;
              if(!obj._bottom) obj._bottom = (obj._top-obj.gap.top)+(obj.$in ? obj.$in.innerHeight() : obj.$after ? win.h : obj._$obj.innerHeight())-obj.gap.bottom;
              if(win.scrolltop >= obj._top && win.scrolltop <= obj._bottom){
                !obj._$obj.is(".show")&&obj._$obj.addClass(obj.classname).stop().animate({"opacity":1}, obj.gap.delay, "linear", function(){ this._$obj.addClass("show"); });
                isFix = true, curFix = true;
              }else{
                obj._$obj.is(".show")&&obj._$obj.removeClass("show").stop().animate({"opacity":1}, Math.max(obj.gap.delay-100, 0), "linear", function(){ this._$obj.removeClass(this.classname); });
                curFix = false;
              }
              if(obj._$obj) obj._$obj.css({"margin-left":win.scrollleft==0||!curFix?"":(win.scrollleft*-1)+"px"});
            }
          }
          if(isFix) !_page.layout.$header.is(".hide")&&_page.layout.$header.addClass("hide");
          else _page.layout.$header.is(".hide")&&_page.layout.$header.removeClass("hide");
        },
        init : function(_this){
          var _ = this;
          for(i in _.el){
            if(_.el[i]==_this) return;
          }
          _.el.push(_this);
          _this.classname = _this.gridoption.classname || "fixed";
          _this._$obj = $.$(_this);
          _this.$in = _this.gridoption.option.in ? $(_this.gridoption.option.in) : null;
          _this.$after = _this.gridoption.option.after ? $(_this.gridoption.option.after) : null;
          _this.gap = {top:0, bottom:0, delay:0};
          if(_this.gridoption.option.gap && _this.gridoption.option.gap.top) _this.gap.top = parseFloat(_this.gridoption.option.gap.top);
          if(_this.gridoption.option.gap && _this.gridoption.option.gap.bottom) _this.gap.bottom = parseFloat(_this.gridoption.option.gap.bottom);
          if(_this.gridoption.option.gap && _this.gridoption.option.gap.delay) _this.gap.delay = parseFloat(_this.gridoption.option.gap.delay);
          if(_this.$in && _this.$in.length==0) _this.$in = null;
          if(_this.$after && _this.$after.length==0) _this.$after = null;
          if(!_.isSet){
            _.isSet = true;
            win.scrolltop = _page.$win.scrollTop();
            win.scrollleft = _page.$win.scrollLeft();
            $(window).off("resize.fixlayoutsc orientationChange.fixlayoutsc scroll.fixlayoutsc").on("resize.fixlayoutsc orientationChange.fixlayoutsc scroll.fixlayoutsc", _.fix.bind(_)).trigger("scroll.fixlayoutsc");
          }
        }
      },
      indicators : {
        parentShow : function($ishide, $eles){
          $ishide.removeClass("js-visible");
          setTimeout(function(){ $eles.removeClass("active"); },100);
        },
        init : function(_this){
          if(!_this.gridoption.ele) return;
          var $this = $.$(_this), classname = "active", $eles = $this.find("["+_this.gridoption.ele+"]"), $ishide = _this.gridoption.hideparent || false;
          if(!$eles.length) return;
          if($ishide) $ishide = $this.closest($ishide);
          if($ishide.length) $ishide.addClass("js-visible");
          $.each($eles, function(){
            var _cur = this, _id = this.getAttribute(_this.gridoption.ele), _ele = document.getElementById(_id), $cur = $.$(_cur);
            if(!_ele) return;
            $.$(_ele).imagesLoaded().always( function( instance ){
              _ele.scene = new ScrollMagic.Scene({triggerElement: "#"+_id, duration: _ele.offsetHeight}).addTo(_page.scrollcontroller).setClassToggle(_cur, "active");
              $.$(_ele).addClass("indicators-initialized");
            });
          });
          if($ishide.length) setTimeout(this.parentShow.bind(this, $ishide, $eles),300); //인디게이터 탭 컨텐츠내에 있을 경우 오작동 수정
        }
      },
      wheelsection : {
        el : [],
        action : function(_this, dir){
          var _ = this, $cur = $.$(_this), _pos;
          _pos = dir=="prev" ? $cur.offset().top-win.h : $cur.offset().top+$cur.innerHeight()+1;
          $("html, body").stop().animate({scrollTop: _pos}, {"duration":600,"easing":"easeInOutQuad", complete:function(){ _this.isWheelAni = false; }});
        },
        wheel : function(_this, timegap, e){
          var _ = this;
          if(win.h < _this.min) return true;
          var _timegap = (new Date()).getTime(), isPass = _timegap-timegap;
          timegap = _timegap;
          if(!(_this.isWheelAni || isPass<200)){
            var E = e.originalEvent;
            var delta = (E.detail) ? E.detail * -40 : (E.wheelDelta ? E.wheelDelta : E.deltaY*-1);
            _this.isWheelAni = true;
            if(delta > 0) _.action.call(_, _this, "prev");
            else if(delta < 0) _.action.call(_, _this, "next");
          }
          e && e.preventDefault && e.preventDefault();
        },
        init : function(_this){
          var _ = this;
          for(i in _.el){
            if(_.el[i]==_this) return;
          }
          _.el.push(_this);
          _this.min = _this.gridoption.min || 0;
          _this.isWheelAni = false;
          if(!_.isSet){
            _.isSet = true;
            win.scrolltop = _page.$win.scrollTop();
            win.scrollleft = _page.$win.scrollLeft();
          }
          $.$(_this).off('mousewheel.sectionJump DOMMouseScroll.sectionJump').on('mousewheel.sectionJump DOMMouseScroll.sectionJump', _.wheel.bind(_, _this, (new Date()).getTime()));
        }
      },
      particle : {
        option : function(color){
          if(!color) color = "#ffffff"
          return { particles:{
            number:{ value:5, density:{ enable:true, value_area:300 } },
            color:{ value:color },
            shape:{ type:"circle", stroke:{ width:0 }, polygon:{ nb_sides:5 } },
            opacity:{ value:1, random:false, anim:{ enable:false, speed:1, opacity_min:0.1, sync:false } },
            size:{ value:3, random:false, anim:{ enable:false, speed:40, size_min:0.1, sync:false } },
            line_linked:{ enable:true, distance:400, color:"#dddddd", opacity:1, width:1 },
            move:{ enable:true, speed:3, direction:"none", random:false, straight:false, out_mode:"bounce", bounce:false, attract:{ enable:false, rotateX:1200, rotateY:360 } }
          },
          interactivity:{
            detect_on:"canvas",
            events:{ onhover:{ enable:false }, onclick:{ enable:false }, resize:true },
            modes:{
              grab:{ distance:600, line_linked:{ opacity:1 } },
              bubble:{ distance:600, size:40, duration:2, opacity:8, speed:3 },
              repulse:{ distance:400, duration:0.4 },
              push:{ particles_nb:4 },
              remove:{ particles_nb:2 }
            }
          },
          retina_detect:true };
        },
        init : function(_this){
          var _ = this, $this = $.$(_this), _option = _.option(_this.gridoption.color||"#ffffff");
          particlesJS($(_this).attr('id'), _option);
        }
      },
      fundmap : {
        init : function(_this){
          var _ = this, $this = $.$(_this);
          $this.find(".btn-fund-more").off("mouseenter mouseleave").on({
            "mouseenter": function(){
              $this.addClass("allshow"); $(this).closest(".map-item").addClass("active");
            }, "mouseleave": function(){
              $this.removeClass("allshow"); $(this).closest(".map-item").removeClass("active");
            }
          });
        }
      },
      ranking : {
        auto : function(_){
          var _this = this;
          clearTimeout(this.timer);
          if(!_this.max || !$.$(_this).is(":visible")) return;
          _this.timer = setTimeout(_.play.bind(_this,_), 3000);
        },
        play : function(_){
          var _this = this;
          clearTimeout(_this.timer);
          var _idx = _this.idx + 1, $cur, $old;
          if(_idx>_this.max) _idx = 0;
          $cur = _this.$child.eq(_idx);
          if(_this.idx>-1) $old = _this.$child.eq(_this.idx);
          if(!$.$(_this).is(":visible")) return;
          _this.idx = _idx;
          var _classchange = function(){
            $cur.addClass(_this.gridoption.option.cname);
            if($old) $old.removeClass(_this.gridoption.option.cname);
          }
          setTimeout(_classchange, 250);
          if(_this.$pos) _this.$pos.stop().animate({"top":$cur.position().top, "opacity":1}, 500);
          _.auto.call(_this, _);
        },
        pause : function(_){
          var _this = this;
          clearTimeout(_this.timer);
        },
        init : function(_this){
          var _ = this, $this = $.$(_this), _activeEl;
          _this.grid = _;
          if(!_this.gridoption.option) _this.gridoption.option = {};
          if(!_this.gridoption.option.cname) _this.gridoption.option.cname = "active";
          if(!_this.gridoption.option.items) _this.gridoption.option.items = "li";
          if(!_this.gridoption.option.pos) _this.gridoption.option.pos = ".pos";
          _this.$child = $this.find(_this.gridoption.option.items);
          _this.$pos = $this.find(_this.gridoption.option.pos);
          if(_this.$pos.length==0) _this.$pos = null;
          _activeEl = _this.$child.filter("."+_this.gridoption.option.cname);
          if(_activeEl.length) _this.idx = _this.$child.index(_activeEl);
          else _this.idx = -1;
          if(_this.idx>-1 && _this.$pos) _this.$pos.css({"top":_this.$child.eq(_this.idx).position().top,"opacity":1})
          _this.max = _this.$child.length-1;
          _this.timer = null;
          $this.off("rankingAuto rankingPause").on("rankingAuto", _.auto.bind(_this, _)).on("rankingPause", _.pause.bind(_this, _));
          if(_this.gridoption.option.autoplay) $this.trigger("rankingAuto");
        }
      },
      init : function($wrap){
        if(!$wrap || $wrap.length==0) return;
        $.each($wrap, function(){
          var _this = this;
          _this.gridoption = $.$(_this).data("grid");
          if(_this.gridoption.case && _page.grid[_this.gridoption.case]) _page.grid[_this.gridoption.case].init(_this);
        });
      }
    },
    chart : {
      option : {
        timeFormat : "YYYY/MM/DD",
        color : {
          pointStyle : ['circle', 'rect', 'star', 'triangle'],
          pieBackgroundColor : ['#1e315c', '#20636e', '#107c50', '#e33e3a', '#fecb09', '#908a82','#bcbcbc'], //pie background
          barBackgroundColor : ['#1e315c', '#747a86', '#747a86', '#747a86', '#747a86', '#747a86','#747a86'], //bar background
          lineBorderColor : ['#d7434c', '#1e315c', '#70b096', '#ffbb00', 'rgba(235, 235, 235, 1)', 'rgba(235, 235, 235, 1)'], //일반 라인
          lineBackgroundColorOpacity : ['rgba(239, 87, 37, 0.4)', 'rgba(255, 195, 27, 0.4)', 'rgba(161, 200, 217, 0.4)', 'rgba(255, 187, 0, 0.4)', 'rgba(235, 235, 235, 0.4)', 'rgba(235, 235, 235, 0.4)'], //일반 라인
          lineBorderColorFirst : ['#e03e48', '#82b1cf', '#94d9bc', '#ffbb00', 'rgba(235, 235, 235, 1)', 'rgba(235, 235, 235, 1)'], //첫번째 강조 라인
          lineBackgroundColorOpacityFirst : ['rgba(239, 87, 37, 0.4)', 'rgba(255, 195, 27, 0.4)', 'rgba(161, 200, 217, 0.4)', 'rgba(255, 187, 0, 0.4)', 'rgba(235, 235, 235, 0.4)', 'rgba(235, 235, 235, 0.4)'], //첫번째 강조 라인

          backgroundColor : ['rgba(239, 87, 37, 1)', 'rgba(255, 195, 27, 1)', 'rgba(161, 200, 217, 1)', 'rgba(235, 235, 235, 1)', 'rgba(235, 235, 235, 1)', 'rgba(235, 235, 235, 1)'], //rgba(146, 214, 185, 1)
          borderColor : ['rgba(239, 87, 37, 1)', 'rgba(255, 195, 27, 1)', 'rgba(161, 200, 217, 1)', 'rgba(235, 235, 235, 1)', 'rgba(235, 235, 235, 1)', 'rgba(235, 235, 235, 1)'],
          backgroundColorOpacity : ['rgba(239, 87, 37, 0.4)', 'rgba(255, 195, 27, 0.4)', 'rgba(161, 200, 217, 0.4)', 'rgba(235, 235, 235, 0.4)', 'rgba(235, 235, 235, 0.4)', 'rgba(235, 235, 235, 0.4)'],
          borderDash : [[0,0], [2,2], [4,4], [10,4]]
        },
        line : function(type){
          var _option;
          if(type=="mini"){
            _option = {
              layout: {padding: {left: 0, right: 0, top: 0, bottom: 0}},
              legend: false,
              tooltips: {enabled:false},
              elements: {point:{ radius: 0, hoverRadius: 0 }},
              scales: {
                yAxes: [{
                  id: 'y-axis-left', position: 'left', type: 'firstLine',
                  gridLines: {drawTicks: false, drawBorder:false, borderDash: [4,2], zeroLineColor:"#000000"}, //drawTicks : 참이면 차트 옆의 축 영역에서 눈금 옆에 선을 그립니다.
                  ticks: {padding:6, fontColor: "#666", maxTicksLimit: 3} //padding : 축에서 눈금 레이블의 오프셋을 설정합니다.
                }],
                xAxes: [{
                  gridLines: {display: false, drawBorder:false, drawTicks: false},
                  ticks: {display: false, beginAtZero: true}
                }]
              }
            }
          }else if(type=="helper"){
            _option = {
              layout: {padding: {left: 5, right: 5, top: 0, bottom: 0}},
              legend: {display: false},
              tooltips: {caretPadding:0},
              elements: {point:{ radius: 0, hoverRadius: 0 }},
              scales: {
                yAxes: [{
                  id: 'y-axis-left', position: 'left', type: 'firstLine',
                  gridLines: {display: false, drawBorder:false, drawTicks: false},
                  ticks: {display: false, beginAtZero: true}
                }],
                xAxes: [{
                  gridLines: {display: false, drawBorder:false, drawTicks: false},
                  ticks: {display: false, beginAtZero: true}
                }]
              }
            }
          }else{
            _option = {
              //legend: {display: true, labels:{usePointStyle:true, boxWidth: 3.5, useLineStyle: true}},
              legendCallback: function(chart){ return ui.chart.legendcustom(chart); },
              elements: {point:{ radius: 0, hoverRadius: 5 }},
              scales: {
                yAxes: [{
                  id: 'y-axis-left', position: 'left', type: 'firstLine',
                  gridLines: {drawTicks: false, drawBorder:false, borderDash: [4,2], zeroLineWidth: 2, zeroLineColor:"#000000"}, //drawTicks : 참이면 차트 옆의 축 영역에서 눈금 옆에 선을 그립니다.
                  ticks: {beginAtZero: true, padding:18, fontColor: "#666", maxTicksLimit: 6} //padding : 축에서 눈금 레이블의 오프셋을 설정합니다.
                },{
                  id: 'y-axis-right', position: 'right', display: false, type: 'firstLine',
                  gridLines: {drawTicks: false, drawBorder:false, borderDash: [4,2], drawOnChartArea: false},//drawOnChartArea: false
                  ticks: {beginAtZero: true, padding:10, fontColor: "#666", maxTicksLimit: 6} //padding : 축에서 눈금 레이블의 오프셋을 설정합니다.
                }],
                xAxes: [{
                  gridLines: {display: false},
                  ticks: {autoSkipPadding: 50, maxRotation: 0, padding:20, fontColor: "#333"}
                }]
              }
            }
            if(type=="date"){
              _option.scales.xAxes = [{
                gridLines: {display: false, drawBorder:false, drawTicks: false, zeroLineColor:"#000000"},
                ticks: {autoSkipPadding: 50, maxRotation: 0, padding:14, fontColor: "#333", maxTicksLimit: 13}, /*maxTicksLimit: 12,*/
                type: 'time',
                time: {
                  parser: 'YYYY/MM/DD',
                  unit: 'day',
                  displayFormats: {day: 'YYYY.MM.DD'}
                  //format: "YYYY/MM/DD"
                  //round: 'day'
                }
              }];
            }
          }
          return _option;
        },
        bar : {
          //legend: {display: false},
          legendCallback: function(chart){ return ui.chart.legendcustom(chart); },
          plugins: {
            labels: {
              render: function (args) { return args.value+"%"; },
              textMargin: 10,
              fontSize: 18,
              fontFamily: "'KBFGText', sans-serif"
            }
          },
          layout: {padding: {top: 27}},
          scales: {
            yAxes: [{
              stacked: false, position: 'right',
              gridLines: {drawTicks: false, drawBorder:false, borderDash: [4,2], zeroLineColor: "#000000", zeroLineWidth: 2}, //drawTicks : 참이면 차트 옆의 축 영역에서 눈금 옆에 선을 그립니다.
              ticks: {
                beginAtZero: true, padding:15, fontSize: 13, stepSize: 10, maxTicksLimit: 6,
                callback: function(value, index, values) { return value+"%"; }
              }
            }],
            xAxes: [{
              stacked: false,
              maxBarThickness: 100, barPercentage: 0.45,
              gridLines: {display: false},
              ticks: {fontSize: 15, padding: 9} //padding : 축에서 눈금 레이블의 오프셋을 설정합니다.
            }]
          }
        },
        pie : {
          tooltips: {mode:"nearest", intersect: true},
          hover: {mode:"nearest", intersect: true},
          legend: {display: false},
          cutoutPercentage: 17,
          backgroundColor: ['#1e315c', '#20636e', '#107c50', '#e33e3a', '#fecb09', '#908a82','#bcbcbc'],
          plugins : {
            labels: {
              //render: 'label',
              render: function (args) { return (Number.parseFloat(args.value)>=10 ? args.label + "\n"+ Number.parseFloat(args.value).toFixed(2)+"%" : ""); },
              fontColor: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)'],
              overlap: false,
              fontSize: 14,
              textMargin:2,
              textShadow: true, shadowBlur: 2, shadowOffsetX: -1, shadowOffsetY: 1,
              shadowColor: 'rgba(0,0,0,0.5)',
              fontFamily: "'KBFGText', sans-serif"
            }
          }
        }
      },
      dataurl : function(v){
        var _data, _option = this.option, _yaxes = false, _ticksSize = null;
        _data = v.data ? v.data : $.ajax({url: v.url, dataType: "json", async: false}).responseJSON;
        if(!_data) return [null, _yaxes];
        if(_data.datasets && _data.datasets.length){
          switch(v.case){ //차트별 색상지정
            case "line" :
              var _min = {left:[], right:[]};
              if(v.type=="date"){
                for(i in _data.labels) _data.labels[i] = moment(_data.labels[i]).format(_option.timeFormat);
              }
              for(i in _data.datasets){
                if(!v.datacolor) _data.datasets[i].borderColor = v.firststrong?_option.color.lineBorderColorFirst[i]:_option.color.lineBorderColor[i];
                if(!v.datacolor) _data.datasets[i].backgroundColor = v.firststrong?_option.color.lineBackgroundColorOpacityFirst[i]:_option.color.lineBackgroundColorOpacity[i];
                //_data.datasets[i].borderDash = _option.color.borderDash[i];
                if(!v.datacolor) _data.datasets[i].pointBackgroundColor = v.firststrong?_option.color.lineBorderColorFirst[i]:_option.color.lineBorderColor[i];
                else _data.datasets[i].pointBackgroundColor = _data.datasets[i].borderColor;
                if(_data.datasets[i].yAxisID && _data.datasets[i].yAxisID=="y-axis-right") _yaxes = true, _min.right.push( Math.min.apply(null, _data.datasets[i].data) );
                else _min.left.push( Math.min.apply(null, _data.datasets[i].data) );
                if(v.firststrong) _data.datasets[i].borderWidth = i==0 ? (v.ismin?2:3) : 1;
              }
              break;
            case "bar" :
              var _single = _data.datasets.length, _max = [], _min = [];
              for(i in _data.datasets){
                _data.datasets[i].borderColor = _data.datasets[i].backgroundColor = _single==1 ? _option.color.barBackgroundColor : _option.color.barBackgroundColor[i];
                _max.push( Math.max.apply(null, _data.datasets[i].data) );
                _min.push( Math.min.apply(null, _data.datasets[i].data) );
              }
              _max = Math.max.apply(null, _max);
              _min = Math.max.apply(null, _min);
              if(_max<=100 && _min >= 0){
                _ticksSize = {};
                _ticksSize.min = 0;
                _ticksSize.max = _max>50 ? 100 : 50;
                _ticksSize.stepSize = _ticksSize.max==100 ? 20 : 10;
              }
              break;
            case "pie" :
            case "doughnut" :
              for(i in _data.datasets) _data.datasets[i].backgroundColor = _option.color.pieBackgroundColor;
              break;
          }
        }else{
          _data = null;
        }
        return [_data, _yaxes, _ticksSize];
      },
      legendcustom: function(chart){
        var text = [], textbar = [], _legend = chart.canvas.parentNode.querySelector(".legend-custom");
        if(!_legend) return;
        if(chart.config.type == 'line' || chart.config.type == 'bar'){
          for (i = 0; i <chart.data.datasets.length; i++) {
            if(!(chart.data.datasets[i].hideLegend) && chart.data.datasets[i].label){
              if(chart.config.type == 'line' || chart.data.datasets[i].type == 'line'){
                text.push('<button type="button" data-idx="'+i+'" data-axesid="'+chart.data.datasets[i].yAxisID+'"><span class="point line" style="background-color:' + chart.data.datasets[i].borderColor + '"></span>');
                text.push('<span>'+chart.data.datasets[i].label+'</span>'); text.push('</button>');
              }else{
                textbar.push('<button type="button" data-idx="'+i+'" data-axesid="'+chart.data.datasets[i].yAxisID+'"><span class="point bar" style="background-color:' + chart.data.datasets[i].borderColor + '"></span>');
                textbar.push('<span>'+chart.data.datasets[i].label+'</span>'); text.push('</button>');
              }
            }
          }
        }
        if(_legend){
          _legend.innerHTML = '<span class="' + chart.id + '-legend">' + textbar.join("") + text.join("") +'</span>';
          $(_legend).off("click.legendclick").on("click.legendclick", "button", function(e){
            ui.chart.legendupdate(e, $(this), chart);
          });
        }
      },
      legendupdate: function(e, $btn, chart){
        var meta, scaleList, _curaxis = $btn.attr("data-axesid"), idx = $btn.attr("data-idx");
        if(!$btn.is(".hide") && ($btn.siblings().length==$btn.siblings(".hide").length)) return;
        $btn.toggleClass("hide");

        meta = chart.getDatasetMeta(idx);
        scaleList = chart.options.scales["yAxes"];
        meta.hidden = meta.hidden === null? !chart.data.datasets[idx].hidden : null;

        var ispass = $btn.siblings('[data-axesid='+_curaxis+']:not(.hide)').length;
        if(!ispass){
          scaleList.forEach(function(axes){
            if(axes.id==_curaxis){
              if(meta.hidden) axes.display = false;
              else axes.display = true;
            }
          });
        }
        //console.log(chart.options.scales.yAxes[idx].id, chart.options.scales.yAxes[idx].position)
        //chart.options.scales.yAxes[idx].display = !chart.options.scales.yAxes[idx].display;
        chart.update();
      },
      barhtml : function(_el,_data){
        //ticks: {max: 100, min: 0, stepSize: 10}
        _el.style.opacity = 0;
        if(!_data[0] || !_data[0].labels || !_data[0].datasets[0] || !_data[0].datasets[0].data) return false;
        var _max, _min, _total = 0, _val, _label, _html="", _datanew=[];
        $.each(_data[0].datasets[0].data, function(ii){
          var _val = _data[0].datasets[0].data[ii], _label = _data[0].labels[ii] || 0;
          _total += _val;
          if(_min==undefined || _min>_val) _min = _val;
          if(_max==undefined || _max<_val) _max = _val;
          _datanew.push([_val, _label]);
        });
        _datanew = _datanew.sort(function(a, b){ return parseFloat(a[0]) > parseFloat(b[0]) ? -1 : 1; });
        $.each(_datanew, function(ii){
          var _val = _datanew[ii][0], _label = _datanew[ii][1], curval;
          curval = _val/_total*100;
          _html += '<span class="item point-'+(ii+1)+'" style="width:'+curval+'%"><span class="name">'+_label+'</span><span class="val">'+curval.toFixed(2)+'%</span></span>';
        });
        if(_html!=""){
          _el.innerHTML = '<span class="area">'+ _html + '</span><span class="ticks step-10"><span class="item"><span class="num">0</span></span><span class="item"><span class="num">10</span></span><span class="item"><span class="num">20</span></span><span class="item"><span class="num">30</span></span><span class="item"><span class="num">40</span></span><span class="item"><span class="num">50</span></span><span class="item"><span class="num">60</span></span><span class="item"><span class="num">70</span></span><span class="item"><span class="num">80</span></span><span class="item"><span class="num">90</span></span><span class="item"><span class="num">100</span></span></span>';
          var labelSize = 0;
          $.each($(_el).find(".area>.item").get().reverse(), function(){
            var _$this = $.$(this), _$name = _$this.find(".name"), _val = _$this.find(".val").get(0), _trigonometric, _labelleft, _size = [_$this.parent().width()-_$this.position().left, _$this.innerWidth(), Math.max(_$name.innerWidth(), 90)];
            if(_size[1]< _size[2]){
              labelSize += _size[2];
              _labelleft = _size[0]-labelSize;
              _$name.css("left",_labelleft+"px");
              _trigonometric = trigonometric(((_size[1]/2)-_labelleft) - (_$name.innerWidth()/2), 20);
              _val.style.height = _trigonometric.hypotenuse+"px";
              _val.style[prefix.js+"Transform"] = "rotate(-"+_trigonometric.angle+"deg)";
              labelSize += 5;
              _$this.addClass("ty-2");
            }
          });
        }
        _el.style.opacity = "";
      },
      redraw : function(v){
        if(!v.case || !v.eleId || (!v.url && !v.data)) return;
        var _data, _el = document.getElementById(v.eleId), _chart, _w, _h, _minsize, _isMin = false;
        if(!_el) return;
        _chart = this, _w = _el.width, _h = _el.height, _minsize = Math.min(_w, _h);
        if((v.case=="line"&&!(v.type=="mini"||v.type=="helper")&&_minsize<400) || ((v.case=="pie"||v.case=="doughnut")&&_minsize<300)) _isMin = true;
        _data = ui.chart.dataurl({url:v.url,data:v.data,case:v.case,type:v.type||null,datacolor:v.datacolor||null,firststrong:v.firststrong||null,ismin:_isMin||null,axeshide:v.axeshide||null});
        if(!_data || !_data[0]) return false;
        if(v.case=="bar-html") return ui.chart.barhtml(_el,_data);
        if(_el._chart) _el._chart.destroy();
        switch(v.case){
          case "line" :
            var _newoption = _chart.option.line(v.type), _limit = [Math.max(Math.floor(_h/60), 3), Math.max(Math.floor(_w/100), 3)];
            if(v.type!="mini" && v.type!="helper"){
              if(_data[1]) _newoption.scales.yAxes[1].display = true;
              else _newoption.scales.yAxes[1].display = false;
            }
            if(v.axeshide){
              if(v.axeshide=="x" || v.axeshide=="all") _newoption.scales.xAxes[0].display = false;
              if(v.axeshide=="y" || v.axeshide=="all"){
                _newoption.scales.yAxes[0].display = false;
                if(_newoption.scales.yAxes[1]) _newoption.scales.yAxes[1].display = false;
              }
            }
            if(_limit[0]){
              _newoption.scales.yAxes[0].ticks.maxTicksLimit = _limit[0];
              if(_newoption.scales.yAxes[1]) _newoption.scales.yAxes[1].ticks.maxTicksLimit = _limit[0];
            }
            if(_limit[1]) _newoption.scales.xAxes[0].ticks.maxTicksLimit = _limit[1];
            if(_isMin){
              _newoption.elements.point.hoverRadius = 3;
              _newoption.scales.xAxes[0].ticks.padding -= 4;
              _newoption.scales.yAxes[0].ticks.padding -= 8;
            }
            if(v.responsive!=undefined) _newoption.responsive = v.responsive;
            _el._chart = new Chart(_el, {
              type: v.type=="helper" ? "lineHelper" : v.case,
              data: _data[0],
              options: _newoption
            });
            _newoption.legendCallback && _el._chart.generateLegend(); //커스텀 legend
            break;
          case "bar" :
            var _newoption = _chart.option.bar;
            if(_data[2]){
              _newoption.scales.yAxes[0].ticks.min = _data[2].min;
              _newoption.scales.yAxes[0].ticks.max = _data[2].max;
              _newoption.scales.yAxes[0].ticks.stepSize = _data[2].stepSize;
            }
            if(v.responsive!=undefined) _newoption.responsive = v.responsive;
            _el._chart = new Chart(_el, {
              type: v.case,
              data: _data[0],
              options: _newoption
            });
            _newoption.legendCallback && _el._chart.generateLegend(); //커스텀 legend
            break;
          case "pie" :
          case "doughnut" :
            if(_isMin){
              _chart.option.pie.plugins.labels.fontSize = 12, _chart.option.pie.plugins.labels.textMargin = 1;
              //_chart.option.pie.plugins.labels.render = function (args) { return args.label; };
              _chart.option.pie.plugins.labels.render = function (args) { return (Number.parseFloat(args.value)>=10 ? args.label + "\n"+ Number.parseFloat(args.value).toFixed(2)+"%" : ""); }; //return args.label +(args.percentage>10?"\n"+ args.value+"%":""); };
            }
            var _newoption = _chart.option.pie;
            if(v.responsive!=undefined) _newoption.responsive = v.responsive;
            _el._chart = new Chart(_el, {
              type: v.case,
              data: _data[0],
              options: _newoption
            });
            break;
        }
      }
    },
    reInit : function($wrap){
      var _ = _page, isReInit = true;
      if(!_.$body) return;
      if(!$wrap) $wrap = _.$body, isReInit = false;
      if(win.h==0) win.h = _page.$win.height(), win.w = _page.$win.width();
      _player.init($wrap); //youtube 플레이어 셋

      $wrap.findFilter('[data-calendar]').uicalendar(); // 캘린더
      $wrap.findFilter('[data-tab]').tab();
      $wrap.findFilter('[data-dropdown]').dropdown();
      _.grid.init($wrap.findFilter('[data-grid]'));
      swipeset.init($wrap.find('div[data-swipe]').not(".swipe-initialized")); //swipe tab
      setTimeout(function(){ $wrap.findFilter('dl[data-accordion], table[data-accordion], div[data-accordion], ul[data-accordion]').accordion(); }, 200);
      _evt.init($wrap, isReInit);
    },
    layout : {
      $header : null, $footer : null, $footerquick : null,
      menu : {
        $nav : null, $all : null,
        sc : function(e){
          win.size.headertop = _page.layout.$header.offset().top, win.size.footertop = _page.layout.$footer.offset().top;
          if(win.scrolltop>win.size.headertop){
            !_page.layout.$header.is(".fixed") && _page.layout.$header.addClass("fixed");
            _page.layout.$header.children(".header-inner").css({"margin-left":(win.scrollleft*-1)+"px"});
          }else{
            _page.layout.$header.is(".fixed") && _page.layout.$header.removeClass("fixed");
            _page.layout.$header.children(".header-inner").css({"margin-left":0});
          }
          if(win.scrolltop>win.size.headertop+win.size.header) !_page.layout.$header.is(".min") && _page.layout.$header.addClass("min");
          else _page.layout.$header.is(".min") && _page.layout.$header.removeClass("min");
          if(_page.layout.$footerquick){
            if(win.scrolltop>Math.max(win.size.headertop, 10)) !_page.layout.$footerquick.is(".full") && _page.layout.$footerquick.addClass("full");
            else _page.layout.$footerquick.is(".full") && _page.layout.$footerquick.removeClass("full");
            if(win.size.footertop>=win.scrolltop+win.h) _page.layout.$footerquick.is(".limite") && _page.layout.$footerquick.removeClass("limite").css({"bottom":""});
            else !_page.layout.$footerquick.is(".limite") && _page.layout.$footerquick.addClass("limite"), _page.layout.$footerquick.css({"bottom":((win.scrolltop+win.h)-win.size.footertop)+"px"});
            _page.layout.$footerquick.css({"margin-right":(win.scrollleft/2)+"px"});

            var _footfix = _page.grid.footfix.el, _footfix_$el;
            if(_footfix.length){
                for(i in _footfix){
                  _footfix_$el = $(_footfix[i]);
                  if(win.size.footertop>=win.scrolltop+win.h) _footfix_$el.is(".limite") && _footfix_$el.removeClass("limite").removeAttr("style");
                  else !_footfix_$el.is(".limite") && _footfix_$el.addClass("limite"), _footfix_$el.css({"bottom":((win.scrolltop+win.h)-win.size.footertop)+"px"});
                  _footfix_$el.css({"margin-left":(win.scrollleft*-1)+"px"});
                }
            }
          }
        },
        gnb : {
          active : null, $major : null, clear : null, cname : {active:"active", hover:"hover", isactive:"is-active"},
          subShow : function(e){
            var _ = _page.layout, $old, $cur, _isold, _idx;
            clearTimeout(_.menu.gnb.clear);
            _idx = e&&e.target ? e.target.getAttribute("data-menu") : null;
            if(_idx) _.menu.gnb.$major.eq(_idx).addClass("hover").siblings().removeClass("hover");
            //_.menu.gnb.$major
            //if(_.menu.gnb.active) _.menu.gnb.active.removeClass(_.menu.gnb.cname.active);
            if(!_.$header.is("."+_.menu.gnb.cname.hover)) _.$header.addClass(_.menu.gnb.cname.hover);
          },
          subHide : function(){
            var _ = _page.layout;
            clearTimeout(_.menu.gnb.clear);
            //if(_.menu.gnb.active) _.menu.gnb.active.addClass(_.menu.gnb.cname.active);
            if(_.$header.is("."+_.menu.gnb.cname.hover)) _.$header.removeClass(_.menu.gnb.cname.hover);
          },
          hideTime : function(){
            var _ = _page.layout;
            clearTimeout(_.menu.gnb.clear);
            if(!_.menu.$nav.find(":focus").length) _.menu.gnb.clear = setTimeout(_.menu.gnb.subHide.bind(this),100);
          },
          init : function(){
            var layout = _page.layout, _ = this;
            _.active = layout.menu.$nav.find("."+_.cname.active);
            if(!_.active || !_.active.length) _.active = null;
            else layout.$header.addClass(_.cname.isactive);
            _.$major = layout.$header.find(".gnb-nav .menu .dep-1");
            var menuleng = _.$major.length;
            $.each(layout.$header.find(".gnb-nav .dep-1"), function(iiii){
              var _idx = iiii % menuleng;
              this.setAttribute("data-menu", _idx);
              $.$(this).find("a, li, ul").attr("data-menu", _idx);
            });
            layout.$header.off("mouseenter.gnbhover mouseleave.gnbhover", ".gnb-nav .dep-1").off("focus.gnbhover blur.gnbhover", "a, button")
              .on("mouseenter.gnbhover", ".gnb-nav .dep-1, .gnb-nav .menu-all", _.subShow)
              .on("mouseleave.gnbhover", ".gnb-nav .dep-1, .gnb-nav .menu-all", _.hideTime)
              .on("focus.gnbhover", ".gnb-nav a, .gnb-nav button", _.subShow)
              .on("blur.gnbhover", ".gnb-nav a, .gnb-nav button", _.hideTime);
          }
        },
        category : {
          $menu : null, $all : null, $allhead : null, $allcont : null, $ranking : null, repeat:null, active : null, clear : null, cname : {active:"active", hover:"hover", opend:"opend-category"}, _sctop : 0,
          toggle : function(){
            var _ = _page.layout;
            clearTimeout(_.menu.category.repeat);
            _.$header.toggleClass(_.menu.category.cname.opend);
            if(_.$header.is("."+_.menu.category.cname.opend)){
              _.menu.category.$all.show();
              _.menu.category.$allhead.stop().animate({"left":"0"}, 600);
              _.menu.category.$allcont.stop().delay(400).animate({"left":"0", "opacity":1}, 600);
              _.menu.category._sctop = win.scrolltop;
              bodyScroll.disableBodyScroll(_.menu.category._sctop);
              setTimeout(_.menu.category.rankingplay.bind(_), 100);
              _.menu.category.$allcont.find(".swiper-container-initialized").each(function(){ this.swiper && this.swiper.update(); });
            }else{
              _.menu.category.$allhead.stop().animate({"left":"-120px"}, 600).promise().done(function(){
                _.menu.category.$all.hide();
                bodyScroll.enableBodyScroll(_.menu.category._sctop);
                _.menu.category._sctop = 0;
              });
              _.menu.category.$allcont.stop().animate({"left":"-100%", "opacity":0}, 300);
            }
          },
          rankingplay : function(){
            var _ = _page.layout;
            if(!_.menu.category.$ranking.is(":visible")) return;
            var _ranking = _.menu.category.$ranking.get(0);
            _ranking.grid.auto.call(_ranking, _ranking.grid);
          },
          catclick : function(e){
            var _ = _page.layout, $first, $dep1;
            $dep1 = $.$(this.parentNode).addClass(_.menu.category.cname.active);
            $dep1.siblings().removeClass(_.menu.category.cname.active);
            _.menu.category.rankingplay();
          },
          init : function(){
            var layout = _page.layout, _ = this;
            _.$all = $(".category-all");
            _.$allhead = _.$all.find(".category-head").css({left:"-120px"});
            _.$allcont = _.$all.find(".category-cont").css({left:"-100%", opacity:0});
            _.$ranking = _.$all.find(".ranking-search-2");
            if(_.$ranking.length==0) _.$ranking = null;
            //_.$menu = _.$allhead.find(".menu");
            layout.$header.off("click.categoryall", ".category .toggle, .category-head .close").on("click.categoryall", ".category .toggle, .category-head .close", _.toggle)
              .off("click.categoryalltab", "[data-act='tab'] button").on("click.categoryalltab", "[data-act='tab'] button", _.rankingplay);
              //.off("click.categoryall", ".category-head .dep-1 > button, .category-head .dep-1 > a").on("click.categoryall", ".category-head .dep-1 > button, .category-head .dep-1 > a", _.catclick)
            //_.$menu.find(".active > button").last().trigger("click");
            //_.toggle();
          }
        },
        init : function(){
          var layout = _page.layout, _ = this;
          layout.menu.gnb.init();
          layout.menu.category.init();
        }
      },
      popup : {
        resize : function($wrap){
          if(!$wrap.length || window.parent.length) return false;
          var size = {
            doc : {w : $wrap.first().width(), h : $wrap.first().height()},
            max : {w : Math.min(screen.width, document.body.offsetWidth), h : Math.min(screen.height, document.body.offsetHeight)}
          };
          window.resizeBy(size.doc.w-size.max.w, size.doc.h-size.max.h);
        }
      },
      quick : {
        toggle : function(e){
          _page.layout.$footerquick.toggleClass("hover");
          e && e.preventDefault();
        },
        quickShow : function(e){
          if(win.w<1511) return;
          _page.layout.$footerquick.addClass("hover");
        },
        quickHide : function(e){
          if(win.w<1511&&e!==true) return;
          _page.layout.$footerquick.removeClass("hover");
        },
        init : function(){
          var _ = this;
          //_.quick
          //_.$footerquick
          win.w = _page.$win.width();
          _.$footerquick.off("click.quickview", ".quick-toggle").on("click.quickview", ".quick-toggle", _.quick.toggle);
          _.$footerquick.off("click.quickview", ".quick-close").on("click.quickview", ".quick-close", $.proxy(_.quick.quickHide, _, true));
          _.$footerquick.off("mouseenter.quickview", _.quick.quickShow).on("mouseenter.quickview", _.quick.quickShow);
          _.$footerquick.off("mouseleave.quickview", _.quick.quickHide).on("mouseleave.quickview", _.quick.quickHide);
        }
      },
      init : function(){
        var _ = this;
        _.$header = $(".header");
        if(!_.$header.length){
          _.$header = null;
        }else{
          _.menu.$nav = _.$header.find(".gnb-nav");
          _.menu.$all = _.$header.find(".all-inner");
          if(!_.menu.$nav.length) _.menu.$nav = null, _.menu.$all = null;
          else _.menu.init();
        }
        _.$footer = $(".footer");
        if(!_.$footer.length) _.$footer = null;
        else _.$footer.find(".btn-top").data("anchor", {"callback":function(){ _page.scrollcontroller && _page.scrollcontroller.update(true); }});
        _.$footerquick = $(".footer .side-quick");
        if(!_.$footerquick.length) _.$footerquick = null;
        else _.quick.init.call(_);
        win.size.header = _.$header?_.$header.innerHeight():0;
        win.size.headertop = _.$header?_.$header.offset().top:0;
        win.size.footer = _.$footer?_.$footer.innerHeight():0;
        win.size.footertop = _.$footer?_.$footer.offset().top:0;
        setTimeout(function(){ _.popup.resize($("div[data-resizewrap]")); }, 200); //팝업리사이즈
      }
    },
    init : function(){
      var _ = this;
      _.docTitle(document.title);
      _.scrollcontroller = new ScrollMagic.Controller();
      _.layout.init();
      _.reInit();
    }
  };

  $(document).ready(function(){
    _page.$html= $("html");
    _page.$body = $("body");
    _page.init();
  });

  //public
  ui.reInit = _page.reInit;
  ui.chart = _page.chart;
  ui.loading = {
    $obj : null, objhtml : ['<div class="loading visible">','<div class="loading wrap-in visible">','<div class="ui-spinner"><div class="spinner-blade"></div><div class="spinner-blade"></div><div class="spinner-blade"></div><div class="spinner-blade"></div><div class="spinner-blade"></div><div class="spinner-blade"></div><div class="spinner-blade"></div><div class="spinner-blade"></div><div class="spinner-txt">Loading...</div></div></div>'],
    enable : function($wrap){
      if($wrap){
        var _wrap = $wrap.get(0);
        if(!_wrap.$loading){
          _wrap.$loading = $(this.objhtml[1]+this.objhtml[2]);
          $wrap.prepend(_wrap.$loading);
        }else{
          _wrap.$loading.addClass("visible");
        }
      }else{
        if(!this.$obj){
          this.$obj = $(this.objhtml[0]+this.objhtml[2]);
          $("body").prepend(this.$obj);
        }else{ this.$obj.addClass("visible"); }
      }
    },
    disable : function($wrap){
      if($wrap){
        var _wrap = $wrap.get(0);
        _wrap.$loading&&_wrap.$loading.removeClass("visible");
      }else{
        this.$obj&&this.$obj.removeClass("visible");
      }
    }
  };
  /* 케이스별 영역로 보이거나 숨겨질때 사용. */
  ui.checkedToggle = function(_this, v){
    var $wrap = v.closest ? $(_this).closest(v.closest) : $("body"), view, hide, _temp;
    if(_this.type&&_this.type=="checkbox" && !_this.checked) _temp = v.view, v.view = v.hide, v.hide = _temp; //체크박스일 경우 체크해제이면 반대로 작동.
    if(v&&v.view){
      view = (typeof v.view === "string") ? [v.view] : v.view;
      $wrap.find('[data-chkarea="'+view.join('"], [data-chkarea="')+'"]').show();
    }
    if(v&&v.hide){
      hide = (typeof v.hide === "string") ? [v.hide] : v.hide;
      $wrap.find('[data-chkarea="'+hide.join('"], [data-chkarea="')+'"]').hide();
    }
  };
  /* 케이스별 영역로 disabled or enabled toggle할때 사용. */
  ui.disabledToggle = function(_this, v){
    var $wrap = v.find ? $(v.find) : (v.closest ? $(_this).closest(v.closest) : $("body")), trueaction = v.act || false, nodename = v.nodename || "input", ischeck = false;
    if(_this.checked) ischeck = true; //체크박스일 경우 체크해제이면 반대로 작동.
    $wrap.find(nodename).each(function(){ $.$(this).prop("disabled", (ischeck && trueaction) || (!ischeck && !trueaction) ? true : false) });
  };

  /* 케이스별 영역로 보이거나 숨겨질때 사용. */
  ui.toastMsg = function(_msg, $wrap){
    if(!_msg) return;
    var $msg, isWrap = (true&&$wrap), $body = $wrap || _page.$body || $("body");
    $msg = $('<div class="toast-msg"><div class="toast-msg-in">'+_msg+'</div><span class="toast-msg-close"></span></div>');
    $body.append($msg).promise().done(function(){
      $msg.fadeIn(300).delay(1000).fadeOut(300).promise().done(function(){ $msg.get(0).remove(); });
      $msg.off("click.toast").on("click.toast", function(){ $msg.stop().fadeOut(300).promise().done(function(){ $msg.get(0).remove(); }); });
    });
  };

  /* player */
  var _player = {
    nowPlayer : null,
    evt : {
      oncanplay : function(){
        if(!this.aborted){
          this.playVideo = function(){ this.play(); };
          this.stopVideo = function(){ this.pause(); this.currentTime = 0; };
          this.pauseVideo = function(){ this.pause(); };
          if(this.isbtn && !this.isready) this.controls = false;
          //this.play();
          //if(_.nowPlayer==this) this.play();
          //else this.pause();
        }
        this.isready = true;
      },
      onerror : function(){ this.aborted = true; },
      onplay : function(){ _player.nowPlayer = this, this.$wrap.addClass("playing"); if(this.isbtn){ this.controls = true; } },
      onpause : function(){ this.$wrap.removeClass("playing"); if(this.isbtn){ this.controls = false; } },
      onplayend : function(){ this.$wrap.removeClass("playing"); if(this.isbtn){ this.controls = false; } },
      // onPlayerReady : function(event){ 유튜브 API 더이상 지원 하지 않음
      //   $(event.target.f.offsetParent||event.target.l.offsetParent).addClass("ready");
      //   event.target.setPlaybackQuality('hd720');
      //   if(_player.nowPlayer===true) _player.nowPlayer = event.target;
      //   if(_player.nowPlayer && _player.nowPlayer==event.target) event.target.playVideo();
      // },
      // onPlayerStateChange : function(event){
      //   if(event.target.f.offsetParent||event.target.l.offsetParent){
      //     var $now = $(event.target.f.offsetParent||event.target.l.offsetParent), _now = $now.get(0);
      //     if( event.data === 1 ) _player.nowPlayer = _now.ytplay, $now.addClass("playing"); // 재생중
      //     if( event.data === 5 || event.data === 2 ) $now.removeClass("playing"); // 정지
      //     if( event.data === 0 ){
      //       $now.removeClass("playing"); // 종료
      //     }
      //   }
      // }
    },
    set : {
      mp4 : function(video, conf){
        var _ = _player, $video = $.$(video), _default, _conf;
        video.aborted = false;
        video.$wrap = $video.parent();
        _default = { canplay: _.evt.oncanplay, play: _.evt.onplay, ended: _.evt.onplayend, pause: _.evt.onpause, error: _.evt.onerror };
        _conf = $.extend({}, _default, conf||{});

        $video.off(_conf).on(_conf);
        if(_conf.togglebtn){
          _conf.togglebtn.onclick = function(e){ return video.playVideo(); };
          video.isbtn = true;
        }
      },
      isYtAPI : false,
      YTAPI: function() {
        _player.set.isYtAPI = true;
        var tag = document.createElement('script'),
             firstScriptTag = document.getElementsByTagName('script')[0];
        tag.src = "https://www.youtube.com/iframe_api";
        tag.classList.add('ytapi');
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      },
      yt : function(video, conf){
        if(!_player.set.isYtAPI || !(YT && YT.Player)){
          if(!_player.set.isYtAPI) _player.set.YTAPI();
          setTimeout(_player.set.yt.bind(this, video, conf), 100);
          return false;
        }
        var _ = _player, _default, _conf, _video;
        _default = {
          playerVars: { autoplay:0, loop:0, controls:0, mute:0, playsinline:1, hd:1, vq:"hd720", wmode:"opaque", enablejsapi:1, modestbranding:1, disablekb:1, fs:1, showinfo:0, rel:0, autohide:1 },
          events: {
            onReady: _.evt.onPlayerReady,
            onStateChange: _.evt.onPlayerStateChange
          }
        };
        _conf = $.extend(true, {}, _default, conf||{});
        if(_conf.playerVars.loop) _conf.playerVars.playlist = _conf.videoId;
        var _p = video.parentNode;
        _p.ytplay = new YT.Player(video, _conf);
        if(_conf.togglebtn) _conf.togglebtn.onclick = function(e){ return _p.ytplay && _p.ytplay.playVideo && _p.ytplay.playVideo(); };
      }
    },
    init : function($wrap){
      $wrap.findFilter("[data-player], video").each(function(){
        var $this = $.$(this), $p = $this.parent();
        var _conf = $.extend({}, $this.data("player"));
        var btn = $p.find(".playbtn");
        if(btn.length>0) _conf.togglebtn = btn[0];
        if(_conf && _conf.videoId) _player.set.yt(this, _conf);
        else _player.set.mp4(this, _conf);
      });
    }
  };

  /* fund portfolio */
  ui.portfolio = {
    $el : {gate : null, gatebtn : null, wrap : null, major : null, progress : null, pricewrap : null, btn : { reset : null, close : null, next : null, prev : null}},
    lastend : null, visible : null, lastscroll : 0, _callback : { closeCallback: null, resultCallback: null},
    reset : function(e, iscurrent){
      var _ = this, $ing;
      if(iscurrent){
        e = iscurrent;
        $ing = _.$el.major.find('[data-step="'+_.visible+'"]');
        $ing.removeAttr("data-state");
        $ing.find("input:checked").prop("checked", false);
        $ing.find('button[data-rel="next"],button[data-rel="result"]').prop("disabled", true);
      }else{
        _.$el.major.filter('[data-state]').removeAttr("data-state");
        $.each(_.$el.major.find('[data-state]'), function(){
          var _$this = $.$(this);
          _$this.removeAttr("data-state");
          _$this.find("input:checked").prop("checked", false);
          _$this.find('button[data-rel="next"],button[data-rel="result"]').prop("disabled", true);
        });
        _.lastend = null, _.visible = "1-1";
      }
      if(e.target.parentNode==_.$el.wrap[0]) _.ing(null);
      else _.statecheck();
    },
    open : function(e){
      var _ = this;
      if(!_.$el.wrap) _.init();
      if(_.lastend||_.visible){
        _.lastscroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        bodyScroll.disableBodyScroll(_.lastscroll);
        _.$el.wrap.fadeIn(100).promise().done($.proxy(_.lastend?_.next:_.ing, _, null, _.lastend || _.visible)); // _target.length>0?_target.next.data("step") :
        setTimeout(function(){ _.$el.wrap.addClass("ani"); }, 300);
        _page.layout.$header.addClass("opend-portfolio");
      }
      e && e.preventDefault();
    },
    close : function(){
      var _ = this, $ing;
      _.$el.wrap.fadeOut(100);
      bodyScroll.enableBodyScroll(_.lastscroll);
      _.lastscroll = 0;
      $ing = _.$el.major.find('[data-step="'+_.visible+'"]');
      $ing.removeAttr("data-visible");
      $ing.data("target").parent.removeAttr("data-visible");
      _.$el.progress.find("[data-visible]").removeAttr("data-visible");
      _.$el.wrap.removeClass("ani").replaceClass("visible-[^ ]* ?", "");
      _page.layout.$header.removeClass("opend-portfolio");
      _._callback.closeCallback && _._callback.closeCallback();
    },
    result : function(e){
      var _ = this;
      _.statecheck();
      if(_page.layout.$header.is(".opend-portfolio")) _.close();
      _._callback.resultCallback && _._callback.resultCallback();
      e && e.preventDefault();
    },
    statecheck : function(){
      var _ = this, $last, iscomplete = 0, max = _.$el.major.length, ismidblank, isFirst = true;
      $.each(_.$el.major, function(ii){ //1depth
        var _$major = $.$(this), count = 0, isEnd = false, $sub = _$major.find(".options [data-step]"), total = $sub.length, _$pr = _.$el.progress.children().eq(ii);
        $.each($sub, function(jj){ //2depth
          var _$subcur = $.$(this), isChecked = false, _$prs = _$pr.children(".steps-sub").children().eq(jj);
          $.each(_$subcur.find("input"), function(){ //input
            if(this.checked){
              isChecked = true;
              if(ii==0 && !this.getAttribute("data-rel")) _$prs.find(".val").html(this.value); //상태바에 값 표시
            }
          });
          if(isChecked){
            _$subcur.attr("data-state","end");
            _$prs.attr("data-state","end");
            _$subcur.find('button[data-rel="next"],button[data-rel="result"]').prop("disabled", false);
            if(_$subcur.prev().length&&!_$subcur.prev().is('[data-state="end"]')) ismidblank = true;
            if(!ismidblank) $last = _$subcur;
            count++;
          }else{
            _$subcur.removeAttr("data-state");
            _$prs.removeAttr("data-state");
            _$subcur.find('button[data-rel="next"],button[data-rel="result"]').prop("disabled", true);
          }
        });
        if(count){
          isEnd = count>=total;
          _$major.attr("data-state",isEnd?"end":"ing");
          _$pr.attr("data-state",isEnd?"end":"ing");
          _.$el.gate.eq(ii).find('[data-rel="progress"]').html(Math.round(count/total*100)+"%");
          _.$el.gate.eq(ii).attr("data-state",isEnd?"end":"ing");
          if(isEnd) iscomplete++;
          isFirst = false;
        }else{
          _$major.removeAttr("data-state");
          _$pr.removeAttr("data-state");
          _.$el.gate.eq(ii).removeAttr("data-state");
          _.$el.gate.eq(ii).find('[data-rel="progress"]').html("0%");
        }
      });
      if(iscomplete==max) _.$el.wrap.parent().find('[data-rel="result"]').prop("disabled", false);
      if($last) _.lastend = $last.data("step");
      if(!_.visible) _.visible = $last && $last.data("target").next ? $last.data("target").next.data("step") : "1-1";
      if(isFirst) _.$el.gatebtn.html(_.$el.gatebtn.text().replace("이어하기","시작하기"));
      else _.$el.gatebtn.html(_.$el.gatebtn.text().replace("시작하기","이어하기"));
    },
    next : function(e, num){
      var _ = this, target, $cur, $skipel;
      if(num) _.visible = num;
      $cur = _.$el.major.find('[data-step="'+_.visible+'"]');
      $skipel = $cur.find('[data-skip]:checked');
      if($skipel.length){
        var _skip = $skipel.data("skip");
        $(_skip.checked).prop("checked", true);
        _.ing(null, _skip.skip);
      }else{
        target = $cur.data("target");
        if(target.next && target.next.data("step")) _.ing(null, target.next.data("step"));
        else _.ing(null, _.visible);
      }
      e && e.preventDefault();
    },
    prev : function(e){
      var _ = this, target;
      target = _.$el.major.find('[data-step="'+_.visible+'"]').data("target");
      if(target.prev && target.prev.data("step")) _.ing(null, target.prev.data("step"));
      e && e.preventDefault();
    },
    ing : function(e, num){
      var _ = this, _num, $ing, $old, curtarget, oldtarget;
      _num = (num ? num : _.visible) || "1-1";
      _.visible = _num;
      $ing = _.$el.major.find('[data-step="'+_.visible+'"]');
      $old = _.$el.major.find('[data-visible]');
      if($ing.is($old)) return;
      curtarget = $ing.data("target");
      $.each($ing.find("[data-prevcase]"), function(){
        var $this = $.$(this), machid = this.getAttribute("data-prevcase");
        if($(machid).is(":checked")){
          $this.css("display","");
        }else{
          $this.css("display","none").find("input").prop("checked", false);
        }
      });

      $ing.attr("data-visible", true);
      if(!curtarget.parent.is("[data-visible]")) curtarget.parent.addClass("delay");
      else curtarget.parent.removeClass("delay");
      setTimeout(function(){ curtarget.parent.removeClass("delay"); }, 700);
      curtarget.parent.attr("data-visible", true);
      curtarget.progress.attr("data-visible", true);
      if($old.length){
        oldtarget = $old.data("target");
        $old.removeAttr("data-visible");
        if(!curtarget.parent.is(oldtarget.parent)) oldtarget.parent.removeAttr("data-visible");
        oldtarget.progress.removeAttr("data-visible");
      }
      if(_.visible.match(/^1/)) _.step1set($ing);
      _.$el.wrap.replaceClass("visible-[^ ]* ?", "visible-"+_.visible);
      _.statecheck();
      e && e.preventDefault();
    },
    step1set : function(visible){
      var _set = function(isprev){
        var $cur = $.$(this), no = $cur.data("step").match(/[0-9]$/)[0], count=1;
        $.each($cur.find(".fm-item>input"), function(zz){
          if(isprev && this.checked) $.$(this).parent().replaceClass("pos-[^ ]* ?", "pos-"+(no)+"-check");
          else $.$(this).parent().replaceClass("pos-[^ ]* ?", "pos-"+(no)+"-"+count);
          if(!isprev || !this.checked) count++;
        });
      };
      visible.prevAll().each(function(){ _set.call(this, true); });
      visible.each(function(){ _set.call(this, false); });
      visible.nextAll().each(function(){ _set.call(this, false); });
    },
    iptclick : function(e){
      var _ = this, $target = $.$(e.target);
      if($target.is('[data-rel="price-input"]')){
        _.$el.pricewrap.addClass("show");
        _.$el.pricewrap.find(".fm-ipt").first().focus();
      }
      if(e.target.value&&e.target.value!=""){
        $target.closest("[data-step]").find('[data-rel="next"],button[data-rel="result"]').prop("disabled", false);
      }else{
        $target.closest("[data-step]").find('[data-rel="next"],button[data-rel="result"]').prop("disabled", true);
      }
    },
    init : function(callback){
      var _ = this;
      if(callback) _._callback = callback;
      _.$el.wrap = $(".portfolio-option");
      _.$el.major = _.$el.wrap.children("[data-step]");
      _.$el.gate = $(".portfolio-gate .step-area > li");
      _.$el.gatebtn = _.$el.gate.closest(".portfolio-gate").find('[data-rel="ing"]').last();
      _.$el.progress = _.$el.wrap.children(".progress");
      _.$el.pricewrap = _.$el.wrap.children(".price-input");
      $.each(_.$el.major, function(ii){
        var _$cur = $.$(this), _$n = _$cur.next("[data-step]").find("[data-step]").first(), _$p = _$cur.prev("[data-step]").find("[data-step]").last(), _$pr = _.$el.progress.children().eq(ii);
        $.each(_$cur.find("[data-step]"), function(jj){
          var _$this = $.$(this), $next = _$this.next("[data-step]"), $prev = _$this.prev("[data-step]"), _$prs = _$pr.children(".steps-sub").children().eq(jj);
          $.$(this).data("target", {parent : _$cur, next : $next.length ? $next : (_$n.length? _$n : null), prev : $prev.length ? $prev : (_$p.length? _$p : null), progress : _$prs});
          if(jj==0) $.$(this).data("isfirst",true);
        });
      });
      _.$el.wrap.parent().find('[data-rel="reset"]').off("click.portfolio").on("click.portfolio", _.reset.bind(_));
      _.$el.wrap.find('[data-rel="current-reset"]').off("click.portfolio").on("click.portfolio", _.reset.bind(_, "current"));
      _.$el.wrap.find('[data-rel="close"]').off("click.portfolio").on("click.portfolio", _.close.bind(_));
      _.$el.wrap.find('[data-rel="next"]').off("click.portfolio").on("click.portfolio", _.next.bind(_));
      _.$el.wrap.find('[data-rel="prev"]').off("click.portfolio").on("click.portfolio", _.prev.bind(_));
      _.$el.wrap.parent().find('[data-rel="ing"]').off("click.portfolio").on("click.portfolio", _.open.bind(_));
      _.$el.wrap.parent().find('[data-rel="result"]').off("click.portfolio").on("click.portfolio", _.result.bind(_));
      _.$el.wrap.on("click.portfolio","input", _.iptclick.bind(_));
      _.$el.pricewrap.find('[data-rel="price-input-close"]').off("click.portfolio").on("click.portfolio", function(e){
        var _this = e.target, _val;
        if(!_this.matchipt) _this.matchipt = [_.$el.major.find('[data-rel="price-input"]'), _.$el.pricewrap.find('[contenteditable]')];
        _val = _this.matchipt[1].html().replace(/[^0-9]*/gi, "");
        if(_val<10000) _this.matchipt[0][0].value = "";
        else _this.matchipt[0][0].value = _this.matchipt[1].html().replace(/[^0-9]*/gi, "");

        _this.matchipt[0].focus().promise().done(function(){
          _this.matchipt[0].trigger("change.match").trigger("click.portfolio");
        });
        _.$el.pricewrap.removeClass("show");
      });

      var matchUnit = {
        unit1 : function(_value){
          var _val, key, _valnum, _k, _case = {1:"원", 10000:"만원", 100000000:"억원"};
          _valnum = parseFloat(_value.replace(/[^0-9]*/gi, ""));
          if(isNaN(_valnum) || _valnum==0) return "0원";
          for(key in _case){
            _k = parseFloat(key);
            if(_valnum>=_k) _val = three_commas(Math.floor(_valnum/_k))+_case[key];
          }
          return _val;
        },
        unit2 : function(_value){
          var _valnum = parseFloat(_value.replace(/[^0-9]*/gi, ""));
          if(isNaN(_valnum) || _valnum==0) return 0;
          return three_commas(_valnum);
        }
      };
      var _matchcheck = function(e){
        var _this = e.target, isIpt = _this.nodeName=="INPUT", isValue = true, _value = isIpt ? _this.value.trim() : _this.innerHTML.trim(), match = _this.getAttribute("data-match");
        if(_value=="") isValue = false;
        var reg_match = new RegExp("\\b"+match+"\\b", "g"), reg_unit = new RegExp("\\bunit[0-9]\\b", "g");
        $.each($('[data-matchsub]'), function(){
          var _sub = this.getAttribute("data-matchsub"), placeholder, isIpt, unit, _valueSub;
          if(_sub.match(reg_match)){
            isIpt = this.nodeName=="INPUT";
            placeholder = this.getAttribute("placeholder");
            unit = _sub.match(reg_unit);
            if(!isValue && placeholder){
              if(isIpt) this.value = placeholder;
              else this.innerHTML = placeholder;
            }else if(isValue){
              if(unit && matchUnit[unit[0]]){
                if(isIpt) this.value = matchUnit[unit[0]](_value);
                else this.innerHTML = matchUnit[unit[0]](_value);
              }else{
                if(isIpt) this.value = _value;
                else this.innerHTML = _value;
              }
            }
          }
        });
      };
      var _matchcheckTimer, _matchcheckDelay = function(e){ clearTimeout(_matchcheckTimer); _matchcheckTimer = setTimeout($.proxy(_matchcheck, _, e), 200); };
      _.$el.wrap.find('[data-match]').off("propertychange.match change.match keyup.match paste.match").on("propertychange.match change.match keyup.match paste.match", _matchcheckDelay).trigger("change.match");
      _.statecheck();
    }
  };

})(this, this.ui = this.ui || {});