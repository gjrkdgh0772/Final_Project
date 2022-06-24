/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */
function hexToRgb(e){var a=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(a,function(e,a,t,i){return a+a+t+t+i+i});var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null}function clamp(e,a,t){return Math.min(Math.max(e,a),t)}function isInArray(e,a){return a.indexOf(e)>-1}var pJS=function(e,a){var t=document.querySelector("#"+e+" > .particles-js-canvas-el");this.pJS={canvas:{el:t,w:t.offsetWidth,h:t.offsetHeight},particles:{number:{value:400,density:{enable:!0,value_area:800}},color:{value:"#fff"},shape:{type:"circle",stroke:{width:0,color:"#ff0000"},polygon:{nb_sides:5},image:{src:"",width:100,height:100}},opacity:{value:1,random:!1,anim:{enable:!1,speed:2,opacity_min:0,sync:!1}},size:{value:20,random:!1,anim:{enable:!1,speed:20,size_min:0,sync:!1}},line_linked:{enable:!0,distance:100,color:"#fff",opacity:1,width:1},move:{enable:!0,speed:2,direction:"none",random:!1,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:3e3,rotateY:3e3}},array:[]},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"grab"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:100,line_linked:{opacity:1}},bubble:{distance:200,size:80,duration:.4},repulse:{distance:200,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}},mouse:{}},retina_detect:!1,fn:{interact:{},modes:{},vendors:{}},tmp:{}};var i=this.pJS;a&&Object.deepExtend(i,a),i.tmp.obj={size_value:i.particles.size.value,size_anim_speed:i.particles.size.anim.speed,move_speed:i.particles.move.speed,line_linked_distance:i.particles.line_linked.distance,line_linked_width:i.particles.line_linked.width,mode_grab_distance:i.interactivity.modes.grab.distance,mode_bubble_distance:i.interactivity.modes.bubble.distance,mode_bubble_size:i.interactivity.modes.bubble.size,mode_repulse_distance:i.interactivity.modes.repulse.distance},i.fn.retinaInit=function(){i.retina_detect&&window.devicePixelRatio>1?(i.canvas.pxratio=window.devicePixelRatio,i.tmp.retina=!0):(i.canvas.pxratio=1,i.tmp.retina=!1),i.canvas.w=i.canvas.el.offsetWidth*i.canvas.pxratio,i.canvas.h=i.canvas.el.offsetHeight*i.canvas.pxratio,i.particles.size.value=i.tmp.obj.size_value*i.canvas.pxratio,i.particles.size.anim.speed=i.tmp.obj.size_anim_speed*i.canvas.pxratio,i.particles.move.speed=i.tmp.obj.move_speed*i.canvas.pxratio,i.particles.line_linked.distance=i.tmp.obj.line_linked_distance*i.canvas.pxratio,i.interactivity.modes.grab.distance=i.tmp.obj.mode_grab_distance*i.canvas.pxratio,i.interactivity.modes.bubble.distance=i.tmp.obj.mode_bubble_distance*i.canvas.pxratio,i.particles.line_linked.width=i.tmp.obj.line_linked_width*i.canvas.pxratio,i.interactivity.modes.bubble.size=i.tmp.obj.mode_bubble_size*i.canvas.pxratio,i.interactivity.modes.repulse.distance=i.tmp.obj.mode_repulse_distance*i.canvas.pxratio},i.fn.canvasInit=function(){i.canvas.ctx=i.canvas.el.getContext("2d")},i.fn.canvasSize=function(){i.canvas.el.width=i.canvas.w,i.canvas.el.height=i.canvas.h,i&&i.interactivity.events.resize&&window.addEventListener("resize",function(){i.canvas.w=i.canvas.el.offsetWidth,i.canvas.h=i.canvas.el.offsetHeight,i.tmp.retina&&(i.canvas.w*=i.canvas.pxratio,i.canvas.h*=i.canvas.pxratio),i.canvas.el.width=i.canvas.w,i.canvas.el.height=i.canvas.h,i.particles.move.enable||(i.fn.particlesEmpty(),i.fn.particlesCreate(),i.fn.particlesDraw(),i.fn.vendors.densityAutoParticles()),i.fn.vendors.densityAutoParticles()})},i.fn.canvasPaint=function(){i.canvas.ctx.fillRect(0,0,i.canvas.w,i.canvas.h)},i.fn.canvasClear=function(){i.canvas.ctx.clearRect(0,0,i.canvas.w,i.canvas.h)},i.fn.particle=function(e,a,t){if(this.radius=(i.particles.size.random?Math.random():1)*i.particles.size.value,i.particles.size.anim.enable&&(this.size_status=!1,this.vs=i.particles.size.anim.speed/100,i.particles.size.anim.sync||(this.vs=this.vs*Math.random())),this.x=t?t.x:Math.random()*i.canvas.w,this.y=t?t.y:Math.random()*i.canvas.h,this.x>i.canvas.w-2*this.radius?this.x=this.x-this.radius:this.x<2*this.radius&&(this.x=this.x+this.radius),this.y>i.canvas.h-2*this.radius?this.y=this.y-this.radius:this.y<2*this.radius&&(this.y=this.y+this.radius),i.particles.move.bounce&&i.fn.vendors.checkOverlap(this,t),this.color={},"object"==typeof e.value)if(e.value instanceof Array){var s=e.value[Math.floor(Math.random()*i.particles.color.value.length)];this.color.rgb=hexToRgb(s)}else void 0!=e.value.r&&void 0!=e.value.g&&void 0!=e.value.b&&(this.color.rgb={r:e.value.r,g:e.value.g,b:e.value.b}),void 0!=e.value.h&&void 0!=e.value.s&&void 0!=e.value.l&&(this.color.hsl={h:e.value.h,s:e.value.s,l:e.value.l});else"random"==e.value?this.color.rgb={r:Math.floor(256*Math.random())+0,g:Math.floor(256*Math.random())+0,b:Math.floor(256*Math.random())+0}:"string"==typeof e.value&&(this.color=e,this.color.rgb=hexToRgb(this.color.value));this.opacity=(i.particles.opacity.random?Math.random():1)*i.particles.opacity.value,i.particles.opacity.anim.enable&&(this.opacity_status=!1,this.vo=i.particles.opacity.anim.speed/100,i.particles.opacity.anim.sync||(this.vo=this.vo*Math.random()));var n={};switch(i.particles.move.direction){case"top":n={x:0,y:-1};break;case"top-right":n={x:.5,y:-.5};break;case"right":n={x:1,y:-0};break;case"bottom-right":n={x:.5,y:.5};break;case"bottom":n={x:0,y:1};break;case"bottom-left":n={x:-.5,y:1};break;case"left":n={x:-1,y:0};break;case"top-left":n={x:-.5,y:-.5};break;default:n={x:0,y:0}}i.particles.move.straight?(this.vx=n.x,this.vy=n.y,i.particles.move.random&&(this.vx=this.vx*Math.random(),this.vy=this.vy*Math.random())):(this.vx=n.x+Math.random()-.5,this.vy=n.y+Math.random()-.5),this.vx_i=this.vx,this.vy_i=this.vy;var r=i.particles.shape.type;if("object"==typeof r){if(r instanceof Array){var c=r[Math.floor(Math.random()*r.length)];this.shape=c}}else this.shape=r;if("image"==this.shape){var o=i.particles.shape;this.img={src:o.image.src,ratio:o.image.width/o.image.height},this.img.ratio||(this.img.ratio=1),"svg"==i.tmp.img_type&&void 0!=i.tmp.source_svg&&(i.fn.vendors.createSvgImg(this),i.tmp.pushing&&(this.img.loaded=!1))}},i.fn.particle.prototype.draw=function(){function e(){i.canvas.ctx.drawImage(r,a.x-t,a.y-t,2*t,2*t/a.img.ratio)}var a=this;if(void 0!=a.radius_bubble)var t=a.radius_bubble;else var t=a.radius;if(void 0!=a.opacity_bubble)var s=a.opacity_bubble;else var s=a.opacity;if(a.color.rgb)var n="rgba("+a.color.rgb.r+","+a.color.rgb.g+","+a.color.rgb.b+","+s+")";else var n="hsla("+a.color.hsl.h+","+a.color.hsl.s+"%,"+a.color.hsl.l+"%,"+s+")";switch(i.canvas.ctx.fillStyle=n,i.canvas.ctx.beginPath(),a.shape){case"circle":i.canvas.ctx.arc(a.x,a.y,t,0,2*Math.PI,!1);break;case"edge":i.canvas.ctx.rect(a.x-t,a.y-t,2*t,2*t);break;case"triangle":i.fn.vendors.drawShape(i.canvas.ctx,a.x-t,a.y+t/1.66,2*t,3,2);break;case"polygon":i.fn.vendors.drawShape(i.canvas.ctx,a.x-t/(i.particles.shape.polygon.nb_sides/3.5),a.y-t/.76,2.66*t/(i.particles.shape.polygon.nb_sides/3),i.particles.shape.polygon.nb_sides,1);break;case"star":i.fn.vendors.drawShape(i.canvas.ctx,a.x-2*t/(i.particles.shape.polygon.nb_sides/4),a.y-t/1.52,2*t*2.66/(i.particles.shape.polygon.nb_sides/3),i.particles.shape.polygon.nb_sides,2);break;case"image":if("svg"==i.tmp.img_type)var r=a.img.obj;else var r=i.tmp.img_obj;r&&e()}i.canvas.ctx.closePath(),i.particles.shape.stroke.width>0&&(i.canvas.ctx.strokeStyle=i.particles.shape.stroke.color,i.canvas.ctx.lineWidth=i.particles.shape.stroke.width,i.canvas.ctx.stroke()),i.canvas.ctx.fill()},i.fn.particlesCreate=function(){for(var e=0;e<i.particles.number.value;e++)i.particles.array.push(new i.fn.particle(i.particles.color,i.particles.opacity.value))},i.fn.particlesUpdate=function(){for(var e=0;e<i.particles.array.length;e++){var a=i.particles.array[e];if(i.particles.move.enable){var t=i.particles.move.speed/2;a.x+=a.vx*t,a.y+=a.vy*t}if(i.particles.opacity.anim.enable&&(1==a.opacity_status?(a.opacity>=i.particles.opacity.value&&(a.opacity_status=!1),a.opacity+=a.vo):(a.opacity<=i.particles.opacity.anim.opacity_min&&(a.opacity_status=!0),a.opacity-=a.vo),a.opacity<0&&(a.opacity=0)),i.particles.size.anim.enable&&(1==a.size_status?(a.radius>=i.particles.size.value&&(a.size_status=!1),a.radius+=a.vs):(a.radius<=i.particles.size.anim.size_min&&(a.size_status=!0),a.radius-=a.vs),a.radius<0&&(a.radius=0)),"bounce"==i.particles.move.out_mode)var s={x_left:a.radius,x_right:i.canvas.w,y_top:a.radius,y_bottom:i.canvas.h};else var s={x_left:-a.radius,x_right:i.canvas.w+a.radius,y_top:-a.radius,y_bottom:i.canvas.h+a.radius};switch(a.x-a.radius>i.canvas.w?(a.x=s.x_left,a.y=Math.random()*i.canvas.h):a.x+a.radius<0&&(a.x=s.x_right,a.y=Math.random()*i.canvas.h),a.y-a.radius>i.canvas.h?(a.y=s.y_top,a.x=Math.random()*i.canvas.w):a.y+a.radius<0&&(a.y=s.y_bottom,a.x=Math.random()*i.canvas.w),i.particles.move.out_mode){case"bounce":a.x+a.radius>i.canvas.w?a.vx=-a.vx:a.x-a.radius<0&&(a.vx=-a.vx),a.y+a.radius>i.canvas.h?a.vy=-a.vy:a.y-a.radius<0&&(a.vy=-a.vy)}if(isInArray("grab",i.interactivity.events.onhover.mode)&&i.fn.modes.grabParticle(a),(isInArray("bubble",i.interactivity.events.onhover.mode)||isInArray("bubble",i.interactivity.events.onclick.mode))&&i.fn.modes.bubbleParticle(a),(isInArray("repulse",i.interactivity.events.onhover.mode)||isInArray("repulse",i.interactivity.events.onclick.mode))&&i.fn.modes.repulseParticle(a),i.particles.line_linked.enable||i.particles.move.attract.enable)for(var n=e+1;n<i.particles.array.length;n++){var r=i.particles.array[n];i.particles.line_linked.enable&&i.fn.interact.linkParticles(a,r),i.particles.move.attract.enable&&i.fn.interact.attractParticles(a,r),i.particles.move.bounce&&i.fn.interact.bounceParticles(a,r)}}},i.fn.particlesDraw=function(){i.canvas.ctx.clearRect(0,0,i.canvas.w,i.canvas.h),i.fn.particlesUpdate();for(var e=0;e<i.particles.array.length;e++){var a=i.particles.array[e];a.draw()}},i.fn.particlesEmpty=function(){i.particles.array=[]},i.fn.particlesRefresh=function(){cancelRequestAnimFrame(i.fn.checkAnimFrame),cancelRequestAnimFrame(i.fn.drawAnimFrame),i.tmp.source_svg=void 0,i.tmp.img_obj=void 0,i.tmp.count_svg=0,i.fn.particlesEmpty(),i.fn.canvasClear(),i.fn.vendors.start()},i.fn.interact.linkParticles=function(e,a){var t=e.x-a.x,s=e.y-a.y,n=Math.sqrt(t*t+s*s);if(n<=i.particles.line_linked.distance){var r=i.particles.line_linked.opacity-n/(1/i.particles.line_linked.opacity)/i.particles.line_linked.distance;if(r>0){var c=i.particles.line_linked.color_rgb_line;i.canvas.ctx.strokeStyle="rgba("+c.r+","+c.g+","+c.b+","+r+")",i.canvas.ctx.lineWidth=i.particles.line_linked.width,i.canvas.ctx.beginPath(),i.canvas.ctx.moveTo(e.x,e.y),i.canvas.ctx.lineTo(a.x,a.y),i.canvas.ctx.stroke(),i.canvas.ctx.closePath()}}},i.fn.interact.attractParticles=function(e,a){var t=e.x-a.x,s=e.y-a.y,n=Math.sqrt(t*t+s*s);if(n<=i.particles.line_linked.distance){var r=t/(1e3*i.particles.move.attract.rotateX),c=s/(1e3*i.particles.move.attract.rotateY);e.vx-=r,e.vy-=c,a.vx+=r,a.vy+=c}},i.fn.interact.bounceParticles=function(e,a){var t=e.x-a.x,i=e.y-a.y,s=Math.sqrt(t*t+i*i),n=e.radius+a.radius;n>=s&&(e.vx=-e.vx,e.vy=-e.vy,a.vx=-a.vx,a.vy=-a.vy)},i.fn.modes.pushParticles=function(e,a){i.tmp.pushing=!0;for(var t=0;e>t;t++)i.particles.array.push(new i.fn.particle(i.particles.color,i.particles.opacity.value,{x:a?a.pos_x:Math.random()*i.canvas.w,y:a?a.pos_y:Math.random()*i.canvas.h})),t==e-1&&(i.particles.move.enable||i.fn.particlesDraw(),i.tmp.pushing=!1)},i.fn.modes.removeParticles=function(e){i.particles.array.splice(0,e),i.particles.move.enable||i.fn.particlesDraw()},i.fn.modes.bubbleParticle=function(e){function a(){e.opacity_bubble=e.opacity,e.radius_bubble=e.radius}function t(a,t,s,n,c){if(a!=t)if(i.tmp.bubble_duration_end){if(void 0!=s){var o=n-p*(n-a)/i.interactivity.modes.bubble.duration,l=a-o;d=a+l,"size"==c&&(e.radius_bubble=d),"opacity"==c&&(e.opacity_bubble=d)}}else if(r<=i.interactivity.modes.bubble.distance){if(void 0!=s)var v=s;else var v=n;if(v!=a){var d=n-p*(n-a)/i.interactivity.modes.bubble.duration;"size"==c&&(e.radius_bubble=d),"opacity"==c&&(e.opacity_bubble=d)}}else"size"==c&&(e.radius_bubble=void 0),"opacity"==c&&(e.opacity_bubble=void 0)}if(i.interactivity.events.onhover.enable&&isInArray("bubble",i.interactivity.events.onhover.mode)){var s=e.x-i.interactivity.mouse.pos_x,n=e.y-i.interactivity.mouse.pos_y,r=Math.sqrt(s*s+n*n),c=1-r/i.interactivity.modes.bubble.distance;if(r<=i.interactivity.modes.bubble.distance){if(c>=0&&"mousemove"==i.interactivity.status){if(i.interactivity.modes.bubble.size!=i.particles.size.value)if(i.interactivity.modes.bubble.size>i.particles.size.value){var o=e.radius+i.interactivity.modes.bubble.size*c;o>=0&&(e.radius_bubble=o)}else{var l=e.radius-i.interactivity.modes.bubble.size,o=e.radius-l*c;o>0?e.radius_bubble=o:e.radius_bubble=0}if(i.interactivity.modes.bubble.opacity!=i.particles.opacity.value)if(i.interactivity.modes.bubble.opacity>i.particles.opacity.value){var v=i.interactivity.modes.bubble.opacity*c;v>e.opacity&&v<=i.interactivity.modes.bubble.opacity&&(e.opacity_bubble=v)}else{var v=e.opacity-(i.particles.opacity.value-i.interactivity.modes.bubble.opacity)*c;v<e.opacity&&v>=i.interactivity.modes.bubble.opacity&&(e.opacity_bubble=v)}}}else a();"mouseleave"==i.interactivity.status&&a()}else if(i.interactivity.events.onclick.enable&&isInArray("bubble",i.interactivity.events.onclick.mode)){if(i.tmp.bubble_clicking){var s=e.x-i.interactivity.mouse.click_pos_x,n=e.y-i.interactivity.mouse.click_pos_y,r=Math.sqrt(s*s+n*n),p=((new Date).getTime()-i.interactivity.mouse.click_time)/1e3;p>i.interactivity.modes.bubble.duration&&(i.tmp.bubble_duration_end=!0),p>2*i.interactivity.modes.bubble.duration&&(i.tmp.bubble_clicking=!1,i.tmp.bubble_duration_end=!1)}i.tmp.bubble_clicking&&(t(i.interactivity.modes.bubble.size,i.particles.size.value,e.radius_bubble,e.radius,"size"),t(i.interactivity.modes.bubble.opacity,i.particles.opacity.value,e.opacity_bubble,e.opacity,"opacity"))}},i.fn.modes.repulseParticle=function(e){function a(){var a=Math.atan2(d,p);if(e.vx=u*Math.cos(a),e.vy=u*Math.sin(a),"bounce"==i.particles.move.out_mode){var t={x:e.x+e.vx,y:e.y+e.vy};t.x+e.radius>i.canvas.w?e.vx=-e.vx:t.x-e.radius<0&&(e.vx=-e.vx),t.y+e.radius>i.canvas.h?e.vy=-e.vy:t.y-e.radius<0&&(e.vy=-e.vy)}}if(i.interactivity.events.onhover.enable&&isInArray("repulse",i.interactivity.events.onhover.mode)&&"mousemove"==i.interactivity.status){var t=e.x-i.interactivity.mouse.pos_x,s=e.y-i.interactivity.mouse.pos_y,n=Math.sqrt(t*t+s*s),r={x:t/n,y:s/n},c=i.interactivity.modes.repulse.distance,o=100,l=clamp(1/c*(-1*Math.pow(n/c,2)+1)*c*o,0,50),v={x:e.x+r.x*l,y:e.y+r.y*l};"bounce"==i.particles.move.out_mode?(v.x-e.radius>0&&v.x+e.radius<i.canvas.w&&(e.x=v.x),v.y-e.radius>0&&v.y+e.radius<i.canvas.h&&(e.y=v.y)):(e.x=v.x,e.y=v.y)}else if(i.interactivity.events.onclick.enable&&isInArray("repulse",i.interactivity.events.onclick.mode))if(i.tmp.repulse_finish||(i.tmp.repulse_count++,i.tmp.repulse_count==i.particles.array.length&&(i.tmp.repulse_finish=!0)),i.tmp.repulse_clicking){var c=Math.pow(i.interactivity.modes.repulse.distance/6,3),p=i.interactivity.mouse.click_pos_x-e.x,d=i.interactivity.mouse.click_pos_y-e.y,m=p*p+d*d,u=-c/m*1;c>=m&&a()}else 0==i.tmp.repulse_clicking&&(e.vx=e.vx_i,e.vy=e.vy_i)},i.fn.modes.grabParticle=function(e){if(i.interactivity.events.onhover.enable&&"mousemove"==i.interactivity.status){var a=e.x-i.interactivity.mouse.pos_x,t=e.y-i.interactivity.mouse.pos_y,s=Math.sqrt(a*a+t*t);if(s<=i.interactivity.modes.grab.distance){var n=i.interactivity.modes.grab.line_linked.opacity-s/(1/i.interactivity.modes.grab.line_linked.opacity)/i.interactivity.modes.grab.distance;if(n>0){var r=i.particles.line_linked.color_rgb_line;i.canvas.ctx.strokeStyle="rgba("+r.r+","+r.g+","+r.b+","+n+")",i.canvas.ctx.lineWidth=i.particles.line_linked.width,i.canvas.ctx.beginPath(),i.canvas.ctx.moveTo(e.x,e.y),i.canvas.ctx.lineTo(i.interactivity.mouse.pos_x,i.interactivity.mouse.pos_y),i.canvas.ctx.stroke(),i.canvas.ctx.closePath()}}}},i.fn.vendors.eventsListeners=function(){"window"==i.interactivity.detect_on?i.interactivity.el=window:i.interactivity.el=i.canvas.el,(i.interactivity.events.onhover.enable||i.interactivity.events.onclick.enable)&&(i.interactivity.el.addEventListener("mousemove",function(e){if(i.interactivity.el==window)var a=e.clientX,t=e.clientY;else var a=e.offsetX||e.clientX,t=e.offsetY||e.clientY;i.interactivity.mouse.pos_x=a,i.interactivity.mouse.pos_y=t,i.tmp.retina&&(i.interactivity.mouse.pos_x*=i.canvas.pxratio,i.interactivity.mouse.pos_y*=i.canvas.pxratio),i.interactivity.status="mousemove"}),i.interactivity.el.addEventListener("mouseleave",function(e){i.interactivity.mouse.pos_x=null,i.interactivity.mouse.pos_y=null,i.interactivity.status="mouseleave"})),i.interactivity.events.onclick.enable&&i.interactivity.el.addEventListener("click",function(){if(i.interactivity.mouse.click_pos_x=i.interactivity.mouse.pos_x,i.interactivity.mouse.click_pos_y=i.interactivity.mouse.pos_y,i.interactivity.mouse.click_time=(new Date).getTime(),i.interactivity.events.onclick.enable)switch(i.interactivity.events.onclick.mode){case"push":i.particles.move.enable?i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb,i.interactivity.mouse):1==i.interactivity.modes.push.particles_nb?i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb,i.interactivity.mouse):i.interactivity.modes.push.particles_nb>1&&i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb);break;case"remove":i.fn.modes.removeParticles(i.interactivity.modes.remove.particles_nb);break;case"bubble":i.tmp.bubble_clicking=!0;break;case"repulse":i.tmp.repulse_clicking=!0,i.tmp.repulse_count=0,i.tmp.repulse_finish=!1,setTimeout(function(){i.tmp.repulse_clicking=!1},1e3*i.interactivity.modes.repulse.duration)}})},i.fn.vendors.densityAutoParticles=function(){if(i.particles.number.density.enable){var e=i.canvas.el.width*i.canvas.el.height/1e3;i.tmp.retina&&(e/=2*i.canvas.pxratio);var a=e*i.particles.number.value/i.particles.number.density.value_area,t=i.particles.array.length-a;0>t?i.fn.modes.pushParticles(Math.abs(t)):i.fn.modes.removeParticles(t)}},i.fn.vendors.checkOverlap=function(e,a){for(var t=0;t<i.particles.array.length;t++){var s=i.particles.array[t],n=e.x-s.x,r=e.y-s.y,c=Math.sqrt(n*n+r*r);c<=e.radius+s.radius&&(e.x=a?a.x:Math.random()*i.canvas.w,e.y=a?a.y:Math.random()*i.canvas.h,i.fn.vendors.checkOverlap(e))}},i.fn.vendors.createSvgImg=function(e){var a=i.tmp.source_svg,t=/#([0-9A-F]{3,6})/gi,s=a.replace(t,function(a,t,i,s){if(e.color.rgb)var n="rgba("+e.color.rgb.r+","+e.color.rgb.g+","+e.color.rgb.b+","+e.opacity+")";else var n="hsla("+e.color.hsl.h+","+e.color.hsl.s+"%,"+e.color.hsl.l+"%,"+e.opacity+")";return n}),n=new Blob([s],{type:"image/svg+xml;charset=utf-8"}),r=window.URL||window.webkitURL||window,c=r.createObjectURL(n),o=new Image;o.addEventListener("load",function(){e.img.obj=o,e.img.loaded=!0,r.revokeObjectURL(c),i.tmp.count_svg++}),o.src=c},i.fn.vendors.destroypJS=function(){cancelAnimationFrame(i.fn.drawAnimFrame),t.remove(),pJSDom=null},i.fn.vendors.drawShape=function(e,a,t,i,s,n){var r=s*n,c=s/n,o=180*(c-2)/c,l=Math.PI-Math.PI*o/180;e.save(),e.beginPath(),e.translate(a,t),e.moveTo(0,0);for(var v=0;r>v;v++)e.lineTo(i,0),e.translate(i,0),e.rotate(l);e.fill(),e.restore()},i.fn.vendors.exportImg=function(){window.open(i.canvas.el.toDataURL("image/png"),"_blank")},i.fn.vendors.loadImg=function(e){if(i.tmp.img_error=void 0,""!=i.particles.shape.image.src)if("svg"==e){var a=new XMLHttpRequest;a.open("GET",i.particles.shape.image.src),a.onreadystatechange=function(e){4==a.readyState&&(200==a.status?(i.tmp.source_svg=e.currentTarget.response,i.fn.vendors.checkBeforeDraw()):(console.log("Error pJS - Image not found"),i.tmp.img_error=!0))},a.send()}else{var t=new Image;t.addEventListener("load",function(){i.tmp.img_obj=t,i.fn.vendors.checkBeforeDraw()}),t.src=i.particles.shape.image.src}else console.log("Error pJS - No image.src"),i.tmp.img_error=!0},i.fn.vendors.draw=function(){"image"==i.particles.shape.type?"svg"==i.tmp.img_type?i.tmp.count_svg>=i.particles.number.value?(i.fn.particlesDraw(),i.particles.move.enable?i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw):cancelRequestAnimFrame(i.fn.drawAnimFrame)):i.tmp.img_error||(i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw)):void 0!=i.tmp.img_obj?(i.fn.particlesDraw(),i.particles.move.enable?i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw):cancelRequestAnimFrame(i.fn.drawAnimFrame)):i.tmp.img_error||(i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw)):(i.fn.particlesDraw(),i.particles.move.enable?i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw):cancelRequestAnimFrame(i.fn.drawAnimFrame))},i.fn.vendors.checkBeforeDraw=function(){"image"==i.particles.shape.type?"svg"==i.tmp.img_type&&void 0==i.tmp.source_svg?i.tmp.checkAnimFrame=requestAnimFrame(check):(cancelRequestAnimFrame(i.tmp.checkAnimFrame),i.tmp.img_error||(i.fn.vendors.init(),i.fn.vendors.draw())):(i.fn.vendors.init(),i.fn.vendors.draw())},i.fn.vendors.init=function(){i.fn.retinaInit(),i.fn.canvasInit(),i.fn.canvasSize(),i.fn.canvasPaint(),i.fn.particlesCreate(),i.fn.vendors.densityAutoParticles(),i.particles.line_linked.color_rgb_line=hexToRgb(i.particles.line_linked.color)},i.fn.vendors.start=function(){isInArray("image",i.particles.shape.type)?(i.tmp.img_type=i.particles.shape.image.src.substr(i.particles.shape.image.src.length-3),i.fn.vendors.loadImg(i.tmp.img_type)):i.fn.vendors.checkBeforeDraw()},i.fn.vendors.eventsListeners(),i.fn.vendors.start()};Object.deepExtend=function(e,a){for(var t in a)a[t]&&a[t].constructor&&a[t].constructor===Object?(e[t]=e[t]||{},arguments.callee(e[t],a[t])):e[t]=a[t];return e},window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),window.cancelRequestAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout}(),window.pJSDom=[],window.particlesJS=function(e,a){"string"!=typeof e&&(a=e,e="particles-js"),e||(e="particles-js");var t=document.getElementById(e),i="particles-js-canvas-el",s=t.getElementsByClassName(i);if(s.length)for(;s.length>0;)t.removeChild(s[0]);var n=document.createElement("canvas");n.className=i,n.style.width="100%",n.style.height="100%";var r=document.getElementById(e).appendChild(n);null!=r&&pJSDom.push(new pJS(e,a))},window.particlesJS.load=function(e,a,t){var i=new XMLHttpRequest;i.open("GET",a),i.onreadystatechange=function(a){if(4==i.readyState)if(200==i.status){var s=JSON.parse(a.currentTarget.response);window.particlesJS(e,s),t&&t()}else console.log("Error pJS - XMLHttpRequest status: "+i.status),console.log("Error pJS - File config not found")},i.send()};

/* User Agent Check */
var uiagent=function(){var e,i=navigator.userAgent,a=!1,n=i.match(/(opera|chrome|safari|firefox|msie|Android|trident(?=\/))\/?\s*(\d+)/i)||[];return null===i.match(/iPhone|iPad|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i)&&null===i.match(/LG|SAMSUNG|Samsung/)||(a=!0),/trident/i.test(n[1])?{ismobile:a,name:"ie",version:(e=/\brv[ :]+(\d+)/g.exec(i)||[])[1]||""}:"Chrome"===n[1]&&null!==(e=i.match(/\b(OPR|Edge)\/(\d+)/))?{ismobile:a,name:e[0].match("OPR")?"opera":"edge",version:e[2]||""}:(n=n[2]?[n[1],n[2]]:[navigator.appName,navigator.appVersion,"-?"],null!==(e=i.match(/version\/(\d+)/i))&&n.splice(1,1,e[1]),n[0]=n[0].toLowerCase().replace("msie","ie"),"ie"==n[0]&&7==n[1]&&i.match(/trident\/4/gi)&&(n[1]=8),a&&"safari"===n[0]&&(n[0]="ios"),{ismobile:a,name:n[0],version:n[1]})}();
var prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('')
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return { dom: dom, lowercase: pre, css: '-' + pre + '-', js: pre[0].toUpperCase() + pre.substr(1) };
})();
/* $.$(this) */
!function(e,a){"use strict";var t=document.getElementsByTagName("html");t&&(t[0].className=$.trim(t[0].className.replace(/no\-js ?/,"")+" "+(uiagent.ismobile?"mobile ":"")+uiagent.name+" v"+uiagent.version));var i=function(e){if(1!==e.nodeType)throw new Error("문서객체여야 합니다.");var t=a.data(e,"$this");return t?t:a.data(e,"$this",a(e))};a.cacheele||a.$||(a.cacheele=i,a.$=a.cacheele)}(this,this.$);

/* console not supported */
!function(){var e=["assert","cd","clear","count","countReset","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","select","table","time","timeEnd","timeStamp","timeline","timelineEnd","trace","warn"],n=window.console=window.console||{},o=function(){};for(i in e)n[e[i]]||(n[e[i]]=o)}();

/* Infinite loop on element focus */
var loopfocus={keyel:"a:visible,button:visible,select:visible,input:visible,textarea:visible,iframe:visible,div[tabindex=0]:visible",set:function(o,e){if(o){var i=o[0],s=e?e[0]:void 0,f=function(e){var f=e.shiftKey;if(9==(e.keyCode||e.which)){e.stopPropagation();var t=o.find(loopfocus.keyel),u=t.length-1;u<0||(f?(s==this&&(t[u].focus(),e.preventDefault()),t[0]!=this&&i!=this||(s?s.focus():t[u].focus(),e.preventDefault())):(s==this&&(t[0].focus(),e.preventDefault()),t[u]!=this&&i!=this||(s?s.focus():t[0].focus(),e.preventDefault())))}};e&&e.off("keydown.focusLoopFirst").on("keydown.focusLoopFirst",f),o.off("keydown.focusLoopFirst",loopfocus.keyel).on("keydown.focusLoopFirst",loopfocus.keyel,f)}},kill:function(o,e){o&&(e&&e.off("keydown.focusLoopFirst"),o.off("keydown.focusLoopFirst",loopfocus.keyel))}};
var _baseuasing = 'easeInOutSine';
/* Utility */
var bodyScroll = {"disableBodyScroll" : function(lastpos, wrap){
  document.body.style.overflow=document.documentElement.style.overflow="hidden";
  if(wrap){
    with(wrap.style){
      position = "fixed", left = 0, right = 0, top = 0, bottom = 0, overflow = "hidden";
    }
    wrap.scrollTop = lastpos;
    return false;
  }
  document.body.comstyleheight=document.body.style.height;
  document.documentElement.comstyleheight=document.documentElement.style.height;
  document.body.style.height=document.documentElement.style.height="auto";
  document.body.scrollTop=document.documentElement.scrollTop=lastpos;
}, "enableBodyScroll" : function(lastpos, wrap){
  document.body.style.overflow=document.documentElement.style.overflow="visible";
  if(wrap){
    with(wrap.style){
      position = "", left = "", right = "", top = "", bottom = "", overflow = "";
    }
    wrap.scrollTop = 0;
    document.body.scrollTop=document.documentElement.scrollTop=lastpos;
    return false;
  }
  document.body.style.height=document.body.comstyleheight;
  document.documentElement.style.height=document.documentElement.comstyleheight;
  document.body.scrollTop=document.documentElement.scrollTop=lastpos;
}};
function url2el(node, context){
  var el = node.getAttribute("data-url") || node.getAttribute("href");
  if(el=="#"||(el&&el.match(/[0-9a-zA-Z_\-]\./))) return null;
  return el&&el.match(/\/|;|\(|\)|\:|<|>|\?/) ? null : ((el=$(el,context || null)).length > 0 ? el : null);
}
function globalEval(expression){ return Function(expression)(); }
function twonum(num){
  num = parseFloat(num);
  return (num<10) ? "0"+num : num;
}
function three_commas(num) {
  var _x = num.toString().split(".");
  _x[0] = _x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return _x.join(".");
}
function trigonometric(w, h){ // 가로/세로를 알때 빗변(hypotenuse), 각도(angle) 구하기
   var r = Math.atan2(w, h);
   if (r < 0) r += Math.PI * 2;
   var d = r*180/Math.PI;
   while (d < 0) d += 360;
  return {hypotenuse:Math.sqrt(Math.pow(w,2)+Math.pow(h,2)), angle:d};
}
function tabindexAdd(el, depth){
  if(!(el.nodeName.toLowerCase().match(/^(a|button|input|select|textarea)$/) || el.getAttribute("contenteditable"))) el.tabIndex = depth;
}
function anchorani(e){
  var $el = url2el(this), $this = $.$(this), _data, _pos = {el:0,wrap:0,scwrap:0,mov:0}, ismodal = false, $focusel = null, focusel = null, $scwrap = $el.closest("[data-anchorwrap]"), isBody = false;
  _data = $.extend({}, {"add" : 0, "isfocus" : true, "isscroll" : true, "callback" : null}, $this.data("anchor"));

  if($scwrap.length==0) $scwrap = $("body, html"), isBody = true;
  _pos.el = $el.offset().top;
  if(!isBody){
    _pos.wrap = $scwrap.offset().top;
    _pos.scwrap = $scwrap.scrollTop();
  }else{
    var headAdd = $scwrap.first().data("anchoradd");
    if(headAdd) _data.add += $("html").data("anchoradd");
  }
  _pos.mov = (_pos.el-(_pos.wrap-_pos.scwrap))-_data.add;
  if(_data.isfocus){
    $focusel = $el.find("[data-anchorfocus]");
    if($focusel.length!=1) $focusel = $el;
    focusel = $focusel.get(0);
    tabindexAdd(focusel, 0);
    if(focusel.offsetHeight>document.documentElement.clientHeight) _data.isfocus = false;
  }
  var _end, elefocus = function(){
    if(_end) return;
    _end = true;
    if(_data.isfocus) this.focus();
    if(_data.callback){
      _data.callback = typeof _data.callback == "function" ? _data.callback.bind(this) : $.proxy($.globalEval(_data.callback), this);
      window.setTimeout(_data.callback, 200);
    }
  };

  if(_data.isscroll) $scwrap.stop().animate({"scrollTop":_pos.mov}, 800, _baseuasing, function(){ if(!_end) elefocus.call(focusel) });
  else if(_data.isfocus) elefocus.call(focusel);
  e && e.preventDefault();
}

//filter && find
$.fn.findFilter = function(){
  var arg = arguments?arguments[0]:null;
  return this.is(arg) ? (this.length>1 ? this.filter(arg) : (this.find(arg).length?this.find(arg).andSelf():this)) : this.find(arg);
};
var uiQuery = (function(){
  var queryName = location.href.split("#")[0], i, rv={}, count = 0;
  if((/\?/).test(queryName)){
    queryName = queryName.split("?")[1].split("&");
    for(i in queryName){
      if((/\=/).test(queryName[i])){
        if(!queryName[i].split) continue;
        rv[queryName[i].split("=")[0]] = queryName[i].split("=")[1];
        count++;
      }
    }
  }
  return rv;
})();

//Replace Class
$.fn.replaceClass = function(){
  var _ = this, args = arguments, str1, re, newname, argLen = args.length, isDefault = argLen>2 ? true : false;
  if(argLen<2) return;
  var re = new RegExp("\\b"+args[0]+"\\b", "g");
  var re2 = new RegExp("\\b"+args[1]+"\\b", "g");
  $.each(this,function(){
    newname = (isDefault && this.className.match(re2) ? args[2] : args[1]);
    this.className = this.className.replace(re, '').replace(/ $/, '');
    if(!this.className.match(newname)) this.className += " "+newname;
  });
  return _;
};

//accordion Type
$.fn.accordion = function(){
  var _option = {
    type : "normal", notslide : false, reset : false, activeidx : false, resetidx : false, effoverlap : false, anitime : 300, autotime : 5300, effect : "slide", $titles : null, $conts : null, $btns : null, $navs : null, hover : false, autoplay: false,
    acttit : "[data-act='title']", actbtn : "[data-act='btn']", actcont : "[data-act='cont']", actclose : "[data-act='close']", acttxt : "[data-act='toggletxt']", actcssname : "active", nav : false, isscroll : false, scrolladd : 0,
    callbackOpen: null, callbackClose: null
  };
  var _clear = function(){ clearTimeout(this.hideId); clearTimeout(this.autoId); };
  var _isFocusLeng = function(){ return $.$(this).find("a:focus, button:focus, input:focus, select:focus, textarea:focus, "+this.option.actcont+":focus").length; }
  var _timeCall = function(e){
    _clear.call(this);
    if(!this.option.reset || _isFocusLeng.call(this)) return this;
    this.hideId = window.setTimeout($.proxy(_reset, this), 200);
  };
  var _iscallback = function(callback){ if(Object.prototype.toString.call(callback).slice(8, -1).toLowerCase() === 'function') callback.call(this); };
  var _slideUp = function(_parent, overlap, _$title){ this.slideUp(overlap?0:_parent.option.anitime, _parent.option.isscroll&&!overlap?$.proxy(_scroll, _$title, _parent):null); };
  var _slideDown = function(_parent, overlap, _$title){ this.slideDown(overlap?0:_parent.option.anitime, _parent.option.isscroll&&!overlap?$.proxy(_scroll, _$title, _parent):null).css({"display":"block"}); };
  var _fadeIn = function(_parent, overlap, _$title){ this.fadeIn(overlap?0:_parent.option.anitime, _parent.option.isscroll&&!overlap?$.proxy(_scroll, _$title, _parent):null).css({"display":"block"}); };
  var _fadeOut = function(_parent, overlap, _$title){ this.fadeOut(overlap?0:_parent.option.anitime, _parent.option.isscroll&&!overlap?$.proxy(_scroll, _$title, _parent):null); };
  var _scroll = function(_parent){ $("body, html").stop().animate({"scrollTop":this.offset().top-(_parent.option.scrolladd||0)}, 400, _baseuasing); };
  var _hide = function(e, _parent, overlap){
    var el = e ? (e.target.nodeName==="A"||e.target.nodeName==="BUTTON" ? e.target : e.currentTarget) : this, _$cont;
    if(el.idx==undefined) return;
    if(!_parent && e.data) _parent = e.data;
    _parent.option.$titles.eq(el.idx).removeClass(_parent.option.actcssname);
    _$cont = _parent.option.$conts.eq(el.idx);
    _$title = _parent.option.$titles.eq(el.idx);
    if(_parent.option.toggletxt) _$title.find(_parent.option.acttxt).text(_parent.option.toggletxt[0]);
    _$cont.removeClass(_parent.option.actcssname).promise().done(_parent.option.notslide?null:(_parent.option.effect=="slide"?$.proxy(_slideUp, _$cont, _parent, overlap, _$title):$.proxy(_fadeOut, _$cont, _parent, overlap, _$title)));
    if(_parent.option.nav) _parent.option.$navs.eq(el.idx).removeClass(_parent.option.actcssname);
    _iscallback(_parent.option.callbackClose);
  };
  var _view = function(e, _parent, overlap){
    var el = e ? (e.target.nodeName==="A"||e.target.nodeName==="BUTTON" ? e.target : e.currentTarget) : this;
    if(el.idx==undefined) return;
    if(!_parent && e.data) _parent = e.data;
    _parent.option.$titles.eq(el.idx).addClass(_parent.option.actcssname);
    _$cont = _parent.option.$conts.eq(el.idx);
    _$title = _parent.option.$titles.eq(el.idx);
    if(_parent.option.toggletxt) _$title.find(_parent.option.acttxt).text(_parent.option.toggletxt[1]);
    _$cont.addClass(_parent.option.actcssname).promise().done(_parent.option.notslide?null:(_parent.option.effect=="slide"?$.proxy(_slideDown, _$cont, _parent, overlap, _$title):$.proxy(_fadeIn, _$cont, _parent, overlap, _$title)));
    _$cont.find("[data-grid]").each(function(){ var _swiper = this.swiper; _swiper&&_swiper.update(), _swiper&&_swiper.params&&_swiper.params.fraction && _swiper.params.fraction.el && _swiper.params.fraction.renderFraction && _swiper.params.fraction.el.html(_swiper.params.fraction.renderFraction(_swiper.realIndex+1, _swiper.loopedSlides || _swiper.slides.length)); }); /* Swiper update() */
    if(_parent.option.nav) _parent.option.$navs.eq(el.idx).addClass(_parent.option.actcssname);
    _iscallback(_parent.option.callbackOpen);
  };
  var _toggle = function(e, _parent){
    var el = e ? (e.target.nodeName==="A"||e.target.nodeName==="BUTTON" ? e.target : e.currentTarget) : this;
    if(el.idx==undefined) return;
    if(!_parent && e.data) _parent = e.data;
    if(_parent.option.$conts.eq(el.idx).is("."+_parent.option.actcssname)){
      _parent.option.activeidx = undefined;
      _hide.call(el, false, _parent);
    }else{
      _parent.option.activeidx = el.idx;
      _view.call(el, false, _parent);
    }
  };
  var _autoplay = function(e){
    _clear.call(this);
    if(!(!this.option.autoplay || _isFocusLeng.call(this))){
      var _next = this.option.activeidx + 1, max = this.option.$btns.length;
      this.option.$btns.eq(_next>=max?0:_next).trigger(this.option.hover?"mouseenter.accordionTitle":"click.accordionTitle");
    }
    _autoplayTime.call(this);
  };
  var _autoplayTime = function(e){
    _clear.call(this);
    this.autoId = window.setTimeout($.proxy(_autoplay, this), this.option.autotime);
  };
  var _click = function(e, isFirst){
    var el = e ? (e.target.nodeName==="A"||e.target.nodeName==="BUTTON" ? e.target : e.currentTarget) : this, _parent = e.data, oldidx, idx, overlap = false;
    _clear.call(_parent);
    if(el.idx==undefined) _reInit.call(_parent);
    oldidx = _parent.option.activeidx, idx = el.idx, type = _parent.option.type;
    if(isFirst){
      _view.call(_parent.option.$btns[idx], false, _parent, true);
    }else if(type=="multi"){
      return _toggle.call(el, false, _parent);
    }else if(oldidx===idx){
      if(type=="single" || _parent.option.hover) return false;
      if(type=="normal") _toggle.call(el, false, _parent);
    }else{
      if(oldidx===false && _parent.option.reset=="class" && _parent.option.resetidx!=false) oldidx = _parent.option.resetidx[0];
      _parent.option.activeidx = idx;
      if(oldidx!==false && oldidx!==idx) overlap=_parent.option.reset=="class"?true:false, _hide.call(_parent.option.$btns[oldidx], false, _parent, overlap);
      _view.call(_parent.option.$btns[idx], false, _parent, overlap);
    }
    e && e.preventDefault();
  };
  var _reset = function(){
    var _this = this;
    if(!(_this.option.activeidx===false || _this.option.activeidx===undefined)){
      _hide.call(_this.option.$btns[_this.option.activeidx], false, _this);
      _this.option.activeidx = false;
    }
    if(_this.option.resetidx===false) return;
    if(_this.option.reset=="class"){
      _this.option.$titles.removeClass(_this.option.actcssname).eq(_this.option.resetidx[0]).addClass(_this.option.resetidx[0]===false?"":_this.option.actcssname);
      _this.option.$conts.removeClass(_this.option.actcssname).eq(_this.option.resetidx[0]).addClass(_this.option.resetidx[0]===false?"":_this.option.actcssname);
    }else{
      _this.option.activeidx = _this.option.resetidx[0];
      _view.call(_this.option.$btns[_this.option.activeidx], false, _this);
    }
  };
  var _reInit = function(){
    var _this = this, $this = $.$(this), activeidx = _this.option.activeidx;
    _this.option.$titles = $this.find(_this.option.acttit).each(function(iii){ this.idx = iii; if(_this.option.activeidx===false && this.className.match(_this.option.actcssname)) activeidx = iii; });
    if($this.find(_this.option.actbtn).length != _this.option.$titles.length){
      _this.option.actbtn = _this.option.$titles.eq(0).prop('nodeName').match(/^(a|button)/i) ? _this.option.acttit : _this.option.acttit+" a:first-child, "+_this.option.acttit+" button:first-child";
    }
    _this.option.$btns = $this.find(_this.option.actbtn).each(function(iii){ this.idx = iii; });
    _this.option.$conts = $this.find(_this.option.actcont).each(function(iii){ this.idx = iii; $.$(this).find(_this.option.actclose).each(function(){ this.idx = iii; }); });
    if(_this.option.nav) _this.option.$navs = $(_this.option.nav).each(function(iii){ this.idx = iii; }).removeClass(_this.option.actcssname);
    if(activeidx!==undefined){
      if(_this.option.reset) _this.option.resetidx = [activeidx, _this.option.$conts.eq(activeidx).attr("class")];
      else _this.option.activeidx = activeidx;
      if(_this.option.nav) _this.option.$navs.eq(activeidx).addClass(_this.option.actcssname);
    }
  };
  $.each(this, function(index){
    var _this = this, $this = $.$(this);
    _this.option = $.extend({}, _option, $this.data("accordion"));
    if(_this.option.type=="single" && _this.option.activeidx===false) _this.option.activeidx=0;
    _reInit.call(_this);
    var eventSelector = (_this.option.actbtn+", "+_this.option.actcont+" a, "+_this.option.actcont+" button, "+_this.option.actcont+" inupt, "+_this.option.actcont+" select, "+_this.option.actcont+" textarea, "+_this.option.actcont);
    var eventSelector2 = (_this.option.actcont+" a, "+_this.option.actcont+" button, "+_this.option.actcont+" inupt, "+_this.option.actcont+" select, "+_this.option.actcont+" textarea, "+_this.option.actcont);
    if(_this.option.hover){
      $this.off("mouseleave.accordionClose").off("focusin.accordionTitle mouseleave.accordionTitle", _this.option.actbtn).off("blur.accordionTitle", eventSelector).off("focus.accordionTitle mouseenter.accordionClose", eventSelector2)
          .on("mouseenter.accordionTitle focus.accordionTitle", _this.option.actbtn, _this, _click).on("mouseleave.accordionClose", $.proxy(_timeCall, _this))
          .on("blur.accordionTitle", eventSelector, $.proxy(_timeCall, _this)).on("focus.accordionTitle mouseenter.accordionClose", eventSelector2, $.proxy(_clear, _this));
    }else{
      $this.off("click.accordionTitle", _this.option.actbtn).off("click.accordionClose", _this.option.actclose).off("blur.accordionTitle", eventSelector).off("focus.accordionTitle", eventSelector2)
        .on("click.accordionTitle", _this.option.actbtn, _this, _click).on("click.accordionClose", _this.option.actclose, _this, _hide)
        .on("blur.accordionTitle", eventSelector, $.proxy(_timeCall, _this)).on("focus.accordionTitle", eventSelector2, $.proxy(_clear, _this));
      if(_this.option.activeidx!==false && !isNaN(parseFloat(_this.option.activeidx))) $this.find(_this.option.actbtn).eq(_this.option.activeidx).trigger("click.accordionTitle", true);
    }
    if(_this.option.nav && _this.option.nav!=_this.option.actbtn && !_this.option.hover) _this.option.$navs.on("click.accordionTitle", function(){ _this.option.$btns.eq(this.idx).trigger("click.accordionTitle"); });
    if(_this.option.nav && _this.option.nav!=_this.option.actbtn && _this.option.hover) _this.option.$navs.on("mouseenter.accordionTitle", function(){ _this.option.$btns.eq(this.idx).trigger("mouseenter.accordionTitle"); });
    if(_this.option.reset) _reset.call(_this);
    if(_this.option.autoplay){
      $this.off("blur.accordionAuto", eventSelector).off("click.accordionAuto", eventSelector).on("blur.accordionAuto", eventSelector, $.proxy(_autoplayTime, _this)).on("click.accordionAuto", eventSelector, $.proxy(_clear, _this));
      _autoplayTime.call(_this);
    }
  });
  return this;
};

//dropdown area
$.fn.dropdown = function(){
  var _option = { hover : false, selected : false, focusout : true, anitime : 250, effect : "fade", acttit : "[data-act='title']", actcont : "[data-act='cont']", actclose : "[data-act='close']", acttxt : "[data-act='toggletxt']", actcssname : "active", onlyclass : false, callbackOpen: null, callbackClose: null };
  var _clear = function(){ clearTimeout(this.hideId); };
  var _timeCall = function(e){
    _clear.call(this);
    if(_isFocusLeng.call(this)) return;
    this.hideId = window.setTimeout($.proxy(_hide, this), 200);
  };
  var _iscallback = function(callback){ if(Object.prototype.toString.call(callback).slice(8, -1).toLowerCase() === 'function') callback.call(this); };
  var _isFocusLeng = function(contclass){ return $.$(this).find("a:focus, button:focus, input:focus, select:focus, textarea:focus, "+this.option.actcont+":focus").length; }
  var _hide = function(pass){
    var _this = this;
    _clear.call(_this);
    if(!_this.option.isopen || (_isFocusLeng.call(this) && !pass)) return;
    if(_this.option.onlyclass) _this.option.cont.removeClass(_this.option.actcssname);
    else if(_this.option.effect=="slide") _this.option.cont.slideUp(_this.option.anitime).removeClass(_this.option.actcssname);
    else _this.option.cont.fadeOut(_this.option.anitime).removeClass(_this.option.actcssname);
    _this.option.tit.removeClass(_this.option.actcssname);
    if(_this.option.toggletxt) _this.option.tit.find(_this.option.acttxt).text(_this.option.toggletxt[0]);
    $.$(_this).removeClass("dropdown-show");
    if(!_this.option.focusout) loopfocus.kill($.$(_this));
    _iscallback(_this.option.callbackClose);
    _this.option.isopen = false;
  };
  var _view = function(){
    var _this = this;
    _clear.call(_this);
    if(_this.option.isopen) return;
    if(_this.option.onlyclass) _this.option.cont.addClass(_this.option.actcssname);
    else if(_this.option.effect=="slide") _this.option.cont.slideDown(_this.option.anitime).addClass(_this.option.actcssname);
    else _this.option.cont.fadeIn(_this.option.anitime).addClass(_this.option.actcssname);
    _this.option.tit.addClass(_this.option.actcssname);
    if(_this.option.toggletxt) _this.option.tit.find(_this.option.acttxt).text(_this.option.toggletxt[1]);
    $.$(_this).addClass("dropdown-show");
    if(!_this.option.focusout) loopfocus.set($.$(_this));
    _iscallback(_this.option.callbackOpen);
    _this.option.isopen = true;
  };

  $.each(this, function(index){
    var _this = this, $this = $.$(this);
    _this.option = $.extend({}, _option, $this.data("dropdown"));
    _this.option.isopen = false;
    _this.option.tit = $this.find(_this.option.acttit);
    _this.option.cont = $this.find(_this.option.actcont).attr("tabindex", -1).css({"outline":"0"});
    var eventSelector = (_this.option.acttit+", "+_this.option.actcont+" a, "+_this.option.actcont+" button, "+_this.option.actcont+" inupt, "+_this.option.actcont+" select, "+_this.option.actcont+" textarea, "+_this.option.actcont);
    var eventSelector2 = (_this.option.acttit+", "+_this.option.actcont+" a, "+_this.option.actcont+" button, "+_this.option.actcont+" inupt, "+_this.option.actcont+" select, "+_this.option.actcont+" textarea");
    if(_this.option.focusout) $this.off("focusout.dropdownSet", eventSelector).on("focusout.dropdownSet", eventSelector, $.proxy(_timeCall, _this));
    if(_this.option.hover){ $this.off("mouseover.dropdownSet mouseenter.dropdownSet focus.dropdownSet", eventSelector).off("mouseleave.dropdownSet").off("click.dropdownSet", _this.option.acttit)
        .on("mouseover.dropdownSet mouseenter.dropdownSet focus.dropdownSet", eventSelector, $.proxy(_view, _this)).on("mouseleave.dropdownSet", $.proxy(_timeCall, _this)).on("click.dropdownSet", _this.option.acttit, function(e){
          var _href = this.getAttribute("href");
          if(_href&&_href.match(/[^#]/)) return true; else e && e.preventDefault();
        });
    }else{ $this.off("focus.dropdownSet", eventSelector).off("click.dropdownSet", eventSelector2).on("focus.dropdownSet", eventSelector, $.proxy(_clear, _this)).on("click.dropdownSet", eventSelector2, function(e){
          var $curBtn = $.$(this), isSubject = $curBtn.is(_this.option.acttit), isClose = $curBtn.is(_this.option.actclose);
          if(_this.option.isopen && ((_this.option.selected || isClose)||isSubject)) _hide.call(_this, true), _this.option.tit.focus();
          else if(!_this.option.isopen) _view.call(_this);
          if(_this.option.selected && !isSubject){
            var _val = this.getAttribute("data-value");
            _this.option.tit.html($curBtn.html()).attr({"title":$curBtn.text(), "data-selected":_val?_val:null});
          }
          if(_this.option.selected || isClose || (!_this.option.selected && isSubject)) e && e.preventDefault();
        });
    }
  });
};

//Tab Type
$.fn.tab = function(){
  var _option = {
    activeidx : false, $titles : null, actbtn : null, fade : false, acttit : "[data-act='tab']", actcssname : "active", callback : null, acttxt : "[data-act='toggletxt']"
  };
  var _reInit = function(){
    var _parent = this, $this = $.$(this);
    _parent.taboption.$titles = $this.find(_parent.taboption.acttit).each(function(iii){ this.idx = iii; if(!_parent.taboption.activeidx && this.className.match(_parent.taboption.actcssname)) _parent.taboption.activeidx = iii; });
    if(!_parent.taboption.$titles || !_parent.taboption.$titles.length) return;
    if(!_parent.taboption.actbtn){
      if(_parent.taboption.$titles[0].nodeName.toLowerCase().match(/^(a|button)$/i)) _parent.taboption.actbtn = _parent.taboption.acttit;
      else _parent.taboption.actbtn = _parent.taboption.acttit+">a:first-child, "+_parent.taboption.acttit+">button:first-child";
    }
    _parent.taboption.$btns = $this.find(_parent.taboption.actbtn).each(function(iii){ this.idx = iii; });
  };
  var _hide = function(_parent){
    var _this = this, $curCont = url2el(_this), idx = _this.idx;
    _parent.taboption.$titles.eq(idx).removeClass(_parent.taboption.actcssname);
    _parent.taboption.$btns.eq(idx).attr("title","");
    if(_parent.taboption.toggletxt) _parent.taboption.$titles.eq(idx).find(_parent.taboption.acttxt).text(_parent.taboption.toggletxt[0]);
    if($curCont){
      if(_parent.taboption.fade) $curCont.fadeOut(800).removeClass(_parent.taboption.actcssname);
      else $curCont.hide().removeClass(_parent.taboption.actcssname);
      $curCont.find(".indicators-initialized").each(function(){ this.scene.enabled(false); }); //인디게이터 탭 컨텐츠내에 있을 경우 오작동 수정
    }
  };
  var _view = function(_parent, isFirst){
    var _this = this, $curCont = url2el(_this), idx = _this.idx;
    _parent.taboption.$titles.eq(idx).addClass(_parent.taboption.actcssname);
    _parent.taboption.$btns.eq(idx).attr("title","선택됨");
    if(_parent.taboption.toggletxt) _parent.taboption.$titles.eq(idx).find(_parent.taboption.acttxt).text(_parent.taboption.toggletxt[1]);
    if($curCont){
      if(_parent.taboption.fade) $curCont.fadeIn(800).addClass(_parent.taboption.actcssname);
      else $curCont.show().addClass(_parent.taboption.actcssname);
      setTimeout(function(){
        $curCont.find(".swiper-container-initialized").each(function(){ var _swiper = this.swiper; _swiper&&_swiper.update(), _swiper.params.fraction && _swiper.params.fraction.el && _swiper.params.fraction.renderFraction && _swiper.params.fraction.el.html(_swiper.params.fraction.renderFraction(_swiper.realIndex+1, _swiper.loopedSlides || _swiper.slides.length)); });
        $curCont.find(".indicators-initialized").each(function(){ this.scene.enabled(true).update(true); });
      }, 500); //인디게이터 탭 컨텐츠내에 있을 경우 오작동 수정
      return true;
    }else{ return false; }
  };
  var _viewImg = function(_parent, isFirst){
    var _this = this, $curCont = url2el(_this), idx = _this.idx;
    _parent.taboption.$titles.removeClass(_parent.taboption.actcssname).eq(idx).addClass(_parent.taboption.actcssname);
    _parent.taboption.$btns.attr("title","").eq(idx).attr("title","선택됨");
    if($curCont){
      var _src = _parent.taboption.$btns.eq(idx).attr("href");
      if(_src && _src.match(/(\.png)|(\.gif)|(\.jpg)|(\.bmp)|(\.tif)/i)) $curCont.attr("src", _src);
      return true;
    }else{ return false; }
  };
  var _click = function(e, isFirst){
    var _this = this, _parent = e.data, _callback;
    if(_this.idx==undefined) _reInit.call(_parent);
    if(_parent.taboption&&_parent.taboption.case&&_parent.taboption.case=="bigimg"){
      var isCont = _viewImg.call(_parent.taboption.$btns[_this.idx], _parent, isFirst);
    }else{
      if(isFirst) _parent.taboption.activeidx = _this.idx;
      else if(!(_parent.taboption.activeidx===false||_parent.taboption.activeidx==undefined) && _parent.taboption.activeidx != _this.idx) _hide.call(_parent.taboption.$btns[_parent.taboption.activeidx], _parent);
      var isCont = _view.call(_parent.taboption.$btns[_this.idx], _parent, isFirst);
    }
    _parent.taboption.activeidx = _this.idx;
    if(_parent.repos) _parent.repos.call(_parent);
    _callback=$.$(this).data("callback")
    _callback && (typeof _callback.callback == "function" ? _callback.callback() : $.globalEval(_callback.callback));
    _parent.taboption.callback &&  (typeof _parent.taboption.callback == "function" ? _parent.taboption.callback() : $.globalEval(_parent.taboption.callback));
    if(isCont) e && e.preventDefault();
  };

  $.each(this, function(index){
    var _parent = this, $this = $.$(this);
    _parent.taboption = $.extend({}, _option, $this.data("tab"));
    _reInit.call(_parent);
    $this.off("click.tab", _parent.taboption.actbtn).on("click.tab", _parent.taboption.actbtn, _parent, _click);
    if(_parent.taboption.activeidx!==false && !isNaN(parseFloat(_parent.taboption.activeidx))) _parent.taboption.$btns.eq(_parent.taboption.activeidx).trigger("click.tab", true);
  });

  return this;
};

//팝업
(function(fc){ 'use strict'; "function"==typeof define && define.amd ? define(["jquery"],fc) : "undefined"!=typeof exports ? module.exports=fc(require("jquery")) : fc($); }(function($){
  'use strict';
  var UiPop = {}, zindex = 10000, dimclass = "dim", openbtnclass = "uipopShow", _defaults = { callbackOpen: null, callbackClose: null, isdim : true, direction : "none", isrepos : true };
  var _elin = function(e, wrap){ return (e.target !== wrap && !$.contains(wrap, e.target)); };
  var _focus = function(e){ this.focus(); };
  var _click = function(e){ !_elin(e, this.ele) || this.close(); };
  var _hide = function(){
    var _ = this;
    _.$wrap.animate({"opacity":"0"}).promise().done(function(){ _.$wrap.removeClass(dimclass).removeAttr("style"); });
    if(_.lastfocus) $.$(_.lastfocus).removeClass(openbtnclass).focus();
    loopfocus.kill(_.$wrap);
    if(_.options.isdim) bodyScroll.enableBodyScroll(_.lastscroll);
    _.lastfocus = null;
    $(window).off("resize.popRepos");
    _.iscallback(_.options.callbackClose);
  };

  UiPop = (function(){
    function _init(element, settings){
      var _ = this;
      _.ele = element, _.$ele = $(_.ele);
      _.isshow = false, _.lastfocus = null, _.lastscroll; /* 열렸는지, 팝업열기전 포커스엘리먼트, 열리기 전 스크롤 위치 값. */
      _.options = $.extend({}, _defaults, _.$ele.data('uipopset') || {}, settings);
      if(_.options.isdim || _.options.direction.match(/(top|bottom)/)) _.options.isrepos = false;
      var tabidx, $focusele = _.$ele.find("[data-focus]");
      if($focusele.length>0) tabidx = null, _.focusele = $focusele.get(0);
      else tabidx = 0, _.focusele = _.$ele.get(0);
      _.$ele.attr({"tabindex":tabidx, "role":"document"});
      if(!_.wrap){
        _.$ele.wrap('<div class="uipop-container'+(_.options.addclass?" "+_.options.addclass:"")+(_.options.isfixed?" isfixed":"")+'" role="alertdialog" aria-labelledby="'+_.ele.id+'"><div class="uipop-track"></div></div>').promise().done(function(){
          _.ele.style.display = "block";
          _.$track = this.parent();
          _.track = _.$track.get(0);
          _.$wrap = _.$track.parent();
          _.wrap = _.$wrap.get(0);
          if(_.options.direction.match(/(top|bottom)/)) _.$track.addClass("track-bottom");
        });
      }
      //_.init();
    }
    return _init;
  }());
  UiPop.prototype = {
    constructor: UiPop,
    //init : function(){ var _ = this; },
    open : function(){
      var _ = this;
      if(_.isshow) return;
      if(document.activeElement.nodeName.toLowerCase()=="body") _.lastfocus = document.focusEl || document.activeElement;
      else _.lastfocus = document.activeElement;
      _.lastscroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
      $.$(_.lastfocus).addClass(openbtnclass);
      loopfocus.set(_.$wrap);
      _.isshow = true, zindex++;
      _.$wrap.addClass(_.options.isdim?dimclass:"").css({"display":"block", "left":(!_.options.isrepos&&_.options.left ?_.options.left:null), "top":(!_.options.isrepos&&_.options.top ?_.options.top:null), "opacity":"0", "z-index":(_.options.isfixed?zindex-800:zindex)}).promise().done(function(){ _.repos.call(_); _focus.call(_.focusele); _.$wrap.animate({"opacity":"1"}); });
      //_.$wrap.find(".swiper-container").each(function(){ if(this.swiper){ this.swiper.update && this.swiper.update(); } }); //swiper Touch Slider 사용시
      ui.reInit(_.$wrap); //swiper Touch Slider 사용시
      if(_.options.isdim){
        bodyScroll.disableBodyScroll(_.lastscroll);
        _.$wrap.off("click.uipopcontainer").on("click.uipopcontainer", _click.bind(_)); //딤클릭시 닫힘
      }
      if(_.options.isrepos) $(window).off("resize.popRepos").on("resize.popRepos", $.proxy(_.repos, _));
      if(_.options.direction.match(/(top|bottom)/)) _.track.style[_.options.direction] = 0;
      _.iscallback(_.options.callbackOpen);
    },
    close : function(){
      var _ = this, _time = 0;
      if(!_.isshow) return;
      _.isshow = false;
      if(_.options.direction.match(/(top|bottom)/)) _.track.style[_.options.direction] = "-100%", _time = 200;
      _.$wrap.off("click.uipopcontainer"); //딤클릭시 닫힘
      setTimeout(_hide.bind(_), _time);
    },
    repos : function(){
      if(this.options.isrepos){
        var size = [document.documentElement.scrollWidth, document.documentElement.scrollHeight, $(window).height(), this.lastscroll || Math.max(document.body.scrollTop, document.documentElement.scrollTop), this.$wrap.width(), this.$wrap.height(), $(".header").height()||0];
        if(this.options.isfixed) this.$wrap.css({"left":"50%", "top":"50%", "margin-left":(size[4]/2*-1)+"px", "margin-top":(size[5]/2*-1+(size[6]/2))+"px"});
        else this.$wrap.css({"left":((size[0] - size[4])/2)+"px", "top":(((size[2] - size[5])/2)+size[3])+"px"});
      }
    },
    setoption : function(option){ this.options = $.extend({}, this.options, option); },
    iscallback : function(callback){ if(Object.prototype.toString.call(callback).slice(8, -1).toLowerCase() === 'function') callback.call(this); }
  }

  $.fn.uipop = function(){
    var _ = this, opt = arguments[0], args = Array.prototype.slice.call(arguments,1), ret;
    $.each(_, function(){
      if(typeof opt == 'object' && opt.winpop) window.open.apply(null, opt.winpop);
      else if(typeof opt == 'object' || typeof opt == 'undefined') this.uipop = new UiPop(this, opt);
      else{
        if(!this.uipop) this.uipop = new UiPop(this, opt);
        ret = this.uipop[opt].apply(this.uipop, args);
        if(typeof ret != 'undefined') return ret;
      }
    });
    return _;
  };
}));

//thousand commas
(function(fc){ 'use strict'; "function"==typeof define && define.amd ? define(["jquery"],fc) : "undefined"!=typeof exports ? module.exports=fc(require("jquery")) : fc($); }(function($){
  'use strict';
  var _numberComma = function(event){
     // "shift 키 + 방향키"를 눌렀을 때에는 제외시키기.
     event = event || window.event;
     var _keyCode = event.keyCode || event.which, isExcess = false, isChange;
     if ( _keyCode == 16 || ( 36 < _keyCode && _keyCode < 41 )) return false;
     var cursor, val, maxvalue, numtype, isSpan = this.nodeName=="SPAN"; //span인지 체크
     cursor = getPositionOfCursor( this ); // 커서의 위치 가져오기.
     maxvalue = this.getAttribute("data-maxnum"), numtype = this.getAttribute("data-numtype"), val = this.value||this.innerHTML;
     if(val.match(/^\.+/)) val = val.replace(/^\.*/,""), isChange = true;
     if(val.match(/^0[0,]+/)) val = val.replace(/^0[0,]+/,"0"), isChange = true;
     if(val.split(".").length>2){
      val = val.split(".");
      val = val[0]+"."+val[1];
      isChange = true;
     }
     if(numtype=="integer" && val.match(/\./)){
       if(isSpan) this.innerHTML = val.split(".")[0];
       else this.value = val.split(".")[0];
       isExcess = true, isChange = false;
     }
     if(maxvalue && maxvalue < parseFloat((val).replace(/,/gi,""))){
       if(isSpan) this.innerHTML = maxvalue;
       else this.value = maxvalue;
       isExcess = true, isChange = false;
    }
     if(isChange){
       if(isSpan) this.innerHTML = val;
       else this.value = val;
       isExcess = true, isChange = false;
     }
    val = (this.value||this.innerHTML);
     var beforeLength = val.length; // 원래 텍스트의 전체 길이
     var beforeLength2 = val.replace(/^0?([0-9])/,"$1").length; // 시작의 0 제거 원래 텍스트의 전체 길이
     if(isSpan) this.innerHTML = thousandSeparatorCommas( this.innerHTML.replace(/^0?([0-9])/,"$1") ); // 시작의 0 제거, 콤마 추가해서, 텍스트 바꿔주기
     else this.value = thousandSeparatorCommas( this.value.replace(/^0?([0-9])/,"$1") );
     var afterLength = isSpan?this.innerHTML.length:this.value.length; // 바뀐 텍스트의 전체 길이
     var gap = Math.max(afterLength - beforeLength, 0);
     cursor.start -= Math.max(beforeLength-beforeLength2, 0);
     cursor.end -= Math.max(beforeLength-beforeLength2, 0);
     if(isExcess) isExcess = afterLength;
     if(document.activeElement==this){
       // 커서의 위치 바꾸기.
       if ( this.selectionStart ){
         this.selectionStart = isExcess ? isExcess : cursor.start + gap;
         this.selectionEnd = isExcess ? isExcess : cursor.end + gap;
       }else if ( this.createTextRange ){
         var start = (isExcess ? isExcess : cursor.start) - beforeLength;
         var end = (isExcess ? isExcess : cursor.end) - beforeLength;
         var range = this.createTextRange();
         range.collapse( false );
         range.moveStart ( "character",  start );
         range.moveEnd ( "character", end );
         range.select();
       }else if(this.nodeName=="SPAN"){
        var range = document.createRange();
        var sel = window.getSelection();
        if(!range || !range.setStart || !this || !this.childNodes || !this.childNodes[0]) return false;
        range.setStart(this.childNodes[0], Math.min(isExcess ? isExcess : cursor.start + gap, this.childNodes[0].length));
        range.setEnd(this.childNodes[0], Math.min(isExcess ? isExcess : cursor.start + gap, this.childNodes[0].length));
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        this.focus();
       }
     }
  };
  function thousandSeparatorCommas ( number ){
     var string = "" + number;  // 문자로 바꾸기.
     string = string.replace( /[^-+\.\d]/g, "" )  // ±기호와 소수점, 숫자들만 남기고 전부 지우기.
     var regExp = /^([-+]?\d+)(\d{3})(\.\d+)?/;  // 필요한 정규식.
     while ( regExp.test( string ) ) string = string.replace( regExp, "$1" + "," + "$2" + "$3" );  // 쉼표 삽입.
     return string;
  }
  function getPositionOfCursor ( tag ){
     var position = { start: 0 , end: 0 };
     if(tag.nodeName=="SPAN"){
      var sel = window.getSelection();
       position.start = sel.anchorOffset;
       position.end = parseInt(tag.innerHTML.length);
     }else if ( tag.selectionStart ){ // ie 10 이상 & 그외 브라우저.
       position.start = tag.selectionStart;
       position.end = tag.selectionEnd;
     }else if ( document.selection ){ // ie 9 이하.
       var range = document.selection.createRange();
       var copyRange = range.duplicate();
            copyRange.expand( "textedit" );
            copyRange.setEndPoint( "EndToEnd" , range );
       var start = copyRange.text.length - range.text.length;
       var end = start - range.text.length;
       position.start = parseInt( start );
       position.end = parseInt( end );
     }
     return  position;
  }

  $.fn.numberComma = function(evt){
    this.off(evt, _numberComma).on(evt, _numberComma).trigger(evt.split(" ")[0]);
    return this;
  };
}));

//mini calendar
(function(fc){ 'use strict'; "function"==typeof define && define.amd ? define(["jquery"],fc) : "undefined"!=typeof exports ? module.exports=fc(require("jquery")) : fc($); }(function($){
  'use strict';
  var uiCal = null, _isShow = false, _curcal, $body, $box, $title, $tbody, btnprev, btnnext, btnprevyear, btnnextyear, btnclose, _today = new Date(), _now = {year : _today.getFullYear(), month : _today.getMonth(), day : _today.getDate()};
  var boxhtml = ['<div class="cal-mini-wrap" tabindex="-1">',
      '<button type="button" class="cal-mini-close first">달력닫기</button>',
      '<h2 class="cal-mini-title"></h2>',
      '<span class="cal-mini-control">','<button type="button" class="cal-mini-prev-year">이전년도</button>','<button type="button" class="cal-mini-prev">이전달</button>','<button type="button" class="cal-mini-next-year">다음년도</button>','<button type="button" class="cal-mini-next">다음달</button>','</span>',
      '<table class="cal-mini-body">', '<caption>달력</caption>',
        '<thead>', '<tr>', '<th>월</th>', '<th>화</th>', '<th>수</th>', '<th>목</th>', '<th>금</th>', '<th>토</th>', '<th>일</th>', '</tr>', '</thead>',
        '<tbody></tbody>',
      '</table>',
      '<button type="button" class="cal-mini-close last">달력닫기</button>',
    '</div>'].join('');

  var _defaults = {
    callbackOpen: null, callbackClose: null, isrepos : true, from:null, to:null, separator : "-", startday : 1,
    btn:true, btnhtml : '<button type="button" class="cal-btn"><span class="ir i-cal">달력</span></button>', width : 252,
    weekname : ["일","월","화","수","목","금","토"], nalsu : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  };
  function choice(e){
    _curcal.ele.value = e.target.getAttribute("data-date");
    _curcal.close();
  }
  function twonum(num){
    num = parseFloat(num);
    return (num<10) ? "0"+num : num;
  }
  function todaycheck(yy,mm,dd){
    return _now.year==yy && _now.month==mm & _now.day==dd;
  }
  function ymdsplit(a){
    if(a.match(/[.\/\-]/)) a = a.split(/[.\/\-]/);
    else if(a.length==8) a = [a.substring(0,4), a.substring(4,6), a.substring(6,8)];
    else a = null;
    if(a) a = [parseFloat(a[0]),parseFloat(a[1]),parseFloat(a[2])];
    return a;
  }
  function periodcheck(type, a, b){
    var _disabled = false;
    a = ymdsplit(a), b = ymdsplit(b);
    if(type=="to") _disabled = (a[0]>b[0]) || (a[0]>=b[0]&&a[1]>b[1]) || (a[0]>=b[0]&&a[1]>=b[1]&&a[2]>b[2]); // to
    else _disabled = (a[0]<b[0]) || (a[0]<=b[0]&&a[1]<b[1]) || (a[0]<=b[0]&&a[1]<=b[1]&&a[2]<b[2]); // from
    return _disabled;
  }
  function disablecheck(_option, b){
    var _disabled = false, _from, _to, _date;
    b = new Date(b).getTime();
    $.each(_option, function(){
      if(typeof this == "string"){
        _date = new Date(this).getTime();
        if(b==_date) _disabled = true;
      }else if(this.to || this.from){
        if(this.to) _to = new Date(this.to).getTime();
        if(this.from) _from = new Date(this.from).getTime();
        if((_to && _from) && (_to >= b && _from <= b)) _disabled = true;
        else if((_to && !_from) && _to >= b) _disabled = true;
        else if((_from && !_to) && _from <= b) _disabled = true;
      }
    });
    return _disabled;
  }
  var hideId, _timeclear = function(){ window.clearTimeout(hideId); }, _timeCall = function(e){
    _timeclear();
    if($box.find("input:focus,button:focus,a:focus,select:focus").length) return;
    hideId = window.setTimeout($.proxy(_curcal.close, _curcal), 200);
  };
  function validDate(val){
    if(!val) return false;
    var _val = ymdsplit(val);
    if(!_val) return "날짜 형식이 맞지 않습니다. ex)0000"+_defaults.separator+"00"+_defaults.separator+"00";
    var _isvalid = true;
    if((_val[0] < 1900 || _val[0] > 3000) || (_val[1] < 1 || _val[1] > 12)) _isvalid = false; //사용가능 하지 않은 년/달 체크
    var lastday = new Date(new Date(_val[0], _val[1], 1) - 86400000).getDate();
    if(_val[2] < 1 || _val[2] > lastday) _isvalid = false; // 사용가능 하지 않은 날자 체크
    return _isvalid ? parseFloat(""+_val[0]+""+twonum(_val[1])+""+twonum(_val[2])) : "존재하지 않은 년월일을 입력하셨습니다. 다시한번 확인해주세요.";
  }

  uiCal = (function(){
    function _init(element, settings){
      var _ = this;
      $body = $("body");
      _.ele = element, _.$ele = $(_.ele), _.$btn = null, _.to = null, _.from = null;
      _.year = null, _.month = null, _.day = null, _.nalsu = null, _.prevmonth = null;
      _.options = $.extend({}, _defaults, _.$ele.data('calendar') || {}, settings);
      if(_.options.to) _.to = document.getElementById(_.options.to);
      if(_.options.from) _.from = document.getElementById(_.options.from);
      if(_.options.btn){
        _.$btn = $(_.options.btnhtml);
        _.$btn.insertAfter(_.ele);
        _.$btn.off("click.uiCal").on("click.uiCal", _.toggle.bind(_));
      }
      _.$ele.off("click.uiCal").on("click.uiCal", _.toggle.bind(_));
      _.$ele.off("focusin.uiCal focusout.uiCal").on("focusin.uiCal",function(){ this.olddate = this.value; }).on("focusout.uiCal",function(){
        if(!this.value) return;
        var isvalid = validDate(this.value);
        if(typeof isvalid == "string"){
          alert(isvalid);
          this.value = this.olddate || "";
          this.focus();
        }else if(typeof isvalid == "number"){
          this.value = String(isvalid).replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, "$1"+_.options.separator+"$2"+_.options.separator+"$3");
        }
      })
      if(!$box) $body.append(boxhtml).promise().done(function(){
        $box = $(".cal-mini-wrap").css({"position":"absolute", "z-index":"20001", "width":_.options.width+"px", "display":"none"});
        $title = $box.find(".cal-mini-title"), $tbody = $box.find("tbody");
        btnprev = $box.find(".cal-mini-prev")[0], btnnext = $box.find(".cal-mini-next")[0], btnprevyear = $box.find(".cal-mini-prev-year")[0], btnnextyear = $box.find(".cal-mini-next-year")[0], btnclose = $box.find(".cal-mini-close");
        $box.off("click.uiCal", ".cal-mini-day", choice.bind(_)).on("click.uiCal", ".cal-mini-day", choice.bind(_)).off("focusout.uiCal", "input,button,a,select").on("focusout.uiCal", "input,button,a,select", $.proxy(_timeCall)).off("focusin.uiCal", "input,button,a,select").on("focusin.uiCal", "input,button,a,select", $.proxy(_timeclear));
        btnclose.on("keydown.uiCal", function(e){
          var f=e.shiftKey, isfirst = e.target.className.match(/first/);
          if(isfirst && f && 9==(e.keyCode||e.which)){
            btnclose.eq(1).focus();
            e.stopPropagation();
          }else if(!isfirst && !f && 9==(e.keyCode||e.which)){
            btnclose.eq(0).focus();
            e.stopPropagation();
          }
        });
      });
    }
    return _init;
  }());
  uiCal.prototype = {
    constructor: uiCal,
    make : function(yy,mm,dd){
      var _ = this;
      _.year = parseFloat(yy||_.year || _now.year);
      _.month = parseFloat(mm||_.month || _now.month);
      _.day = parseFloat(dd||_.day || _now.day);
      _.makeday.call(_, false);
    },
    makeday : function(type, e){
      var _ = this;
      if(type && e){
        e.target&&e.target.focus();
        var oldyear = _.year;
        if(type=="prev") _.month = _.month - 1;
        if(type=="next") _.month = _.month + 1;
        if(type=="prevyear") _.year = _.year - 1;
        if(type=="nextyear") _.year = _.year + 1;
        if(_.year < 1900 || _.year > 3000) _.year = oldyear;
      }
      if(_.month<0) _.month = _.month + 12, _.year -= 1;
      if(_.month>11) _.month = _.month - 12, _.year += 1;
      $title.html(_.year+"."+twonum(_.month+1));

      if ((_.year % 4 === 0) && (_.year % 100 !== 0) || (_.year % 400 === 0)) _.options.nalsu[1] = 29;
      var firstDay = new Date(_.year, _.month, 1), _first = firstDay.getDay()==0 && _.options.startday==1 ? 7 : firstDay.getDay();
      _.prevmonth = Math.abs(_first - _.options.startday);
      _.nalsu = _.options.nalsu[_.month];

      var i, j, c=0, istoday, isdisabled, curday, loop = Math.ceil((_.prevmonth + _.nalsu) / 7), _html = '', isperiod = false;
      if(_.from || _.to) isperiod = _.from || _.to;

      for(i=0; i<loop; i++){
        _html += '<tr>';
        for(j=0; j<7; j++){
          curday = false, istoday = false, isdisabled = false;
          if(!(i==0 && j < _.prevmonth)){
            c++;
            if(c <= _.nalsu){
              istoday = todaycheck(_.year,_.month,c);
              curday = _.year+_.options.separator+twonum(_.month+1)+_.options.separator+twonum(c);
              if(isperiod && isperiod.value) isdisabled = periodcheck(_.from?"from":"to", isperiod.value, curday);
              if(!isdisabled && _.options.disable) isdisabled = disablecheck(_.options.disable, curday);
            }
          }
          _html += '<td'+(istoday?' class="today"':"")+'>'+(curday ? '<button type="button" class="cal-mini-day" data-date="'+curday+'"'+(isdisabled ? " disabled":"")+'>'+c+'</button>': '')+'</td>';
        }
        _html += '</tr>';
      }
      $tbody.html(_html);
    },
    toggle : function(){
      var _ = this;
      if(_.ele.isopen) _.close.call(_);
      else _.open.call(_);
    },
    open : function(){
      if(_curcal) _curcal.$btn.removeClass("active"), _curcal.ele.isopen = false;
      var _ = this, curvalue = null;
      _curcal = _;
      if(_.ele.disabled) return false;
      if(_.$btn) _.$btn.addClass("active");
      btnprev.onclick = _.makeday.bind(_, "prev");
      btnnext.onclick = _.makeday.bind(_, "next");
      btnprevyear.onclick = _.makeday.bind(_, "prevyear");
      btnnextyear.onclick = _.makeday.bind(_, "nextyear");
      btnclose[0].onclick = btnclose[1].onclick = _.close.bind(_, true);
      if(_.ele.value) curvalue = ymdsplit(_.ele.value);
      if(curvalue) _.make.call(_, curvalue[0], curvalue[1]-1, curvalue[2]);
      else _.make.call(_);
      if(_.options.isrepos) $(window).off("resize.minicalrepos").on("resize.minicalrepos", $.proxy(_.repos, _)).trigger("resize.minicalrepos");
      $box.show().focus();
      btnclose.eq(1).focus();
      _.ele.isopen = true;
    },
    close : function(){
      var _ = this;
      if(_.$btn) _.$btn.removeClass("active").focus();
      else _.ele.focus();
      $box.hide();
      _curcal = null;
      _.ele.isopen = false;
      if(_.options.isrepos) $(window).off("resize.minicalrepos");
    },
    repos : function(){
      var _ = this, bodyWidth = $body.outerWidth(), bodyHeight = $body.get(0).scrollHeight, pos = {top:"auto", bottom:"auto", left:"auto", right:"auto"};
      if(_.$ele.offset().left+_.options.width > bodyWidth) pos.right = (bodyWidth-(_.$ele.offset().left+_.$ele.outerWidth()))+"px";
      else pos.left = _.$ele.offset().left+"px";
      pos.top = (_.$ele.offset().top+_.$ele.outerHeight()+3)+"px";
      $box.css({"left":pos.left,"right":pos.right,"top":pos.top,"bottom":pos.bottom});
    },
    iscallback : function(callback){ if(Object.prototype.toString.call(callback).slice(8, -1).toLowerCase() === 'function') callback.call(this); }
  };

  $.fn.uicalendar = function(){
    var _ = this, opt = arguments[0], args = Array.prototype.slice.call(arguments,1), ret;
    $.each(_, function(){
      if(typeof opt == 'object' || typeof opt == 'undefined') this.uicalendar = new uiCal(this, opt);
      else{
        if(!this.uicalendar) this.uicalendar = new uiCal(this, opt);
        ret = this.uicalendar[opt].apply(this.uicalendar, args);
        if(typeof ret != 'undefined') return ret;
      }
    });
    return _;
  };
}));

/*responsive swipe*/
var swipeset = {
  case1 : {
    curdata : { $obj : null, $child : null, endpos : 0, startpos : 0 },
    move : function(e, phase, direction, distance, duration, fingers){
      var _this = e.currentTarget, $this = $.$(_this), _ = swipeset[_this.option.type];
      if(phase=="start"){
        if(!$this || $this.is(".swipe-off")) return true;
        $this.off("mouseleave.swipeend").on("mouseleave.swipeend", _.end).scrollLeft(0);
        _this.$list = $this.data("$list");
        _this.startpos = _this.endpos = _this.$list.position().left;
      }
      if(!$this || $this.is(".swipe-off")) return true;
      if(direction==="left" || direction==="right"){
        if(_this.option.guide) swipeset.guidehide($this);
        var dir = (direction==="left") ? -1 : 1;
        _this.$list.css("left",_this.endpos+(distance*dir))
        if(phase=="end" || phase=="cancel"){
          _this.endpos += distance*dir;
          _.end.call(_this, e, Math.min(distance/duration*200, $this.width()));
        }
      }
    },
    keyboard : {
      move : function(e ,pos){
        var _this = e.currentTarget, $this = $.$(_this), _code, dir, max, aPos, isPos = pos!=undefined;
        if(!$this || $this.is(".swipe-off")) return true;
        _this.$list.scrollLeft(0);
        _code = e.which || e.keyCode;
        if(_code==37 || _code==39 || isPos) swipeset[_this.option.type].moveact.call(_this, _code==39?-1 : 1);
      },
      evset : function(e){
        var _this = e.currentTarget, $this = $.$(_this);
        if(!_this || !_this.option) return false;
        var _case1 = swipeset[_this.option.type];
        $this.scrollLeft(0);
        _this.endpos = _this.startpos = _this.$list.position().left;
        if(_this.option.guide) swipeset.guidehide($this);
        $this.off("keydown.swipeset").on("keydown.swipeset", _case1.keyboard.move);
      },
      evkill : function(e){
        var _this = e.currentTarget;
        $.$(_this).off("keydown.swipeset");
        _this.endpos = _this.startpos = 0;
      }
    },
    end : function(e, addPos){
      var _this = e.currentTarget, $this = $.$(_this), _ = swipeset[_this.option.type], leave;
      if(e&&e.type=="mouseleave") leave = true, _this.endpos = _this.$list.position().left;
      var _thisW = $this.width(), max = ((_this.$list.get(0).scrollWidth-_thisW)*-1), aPos, pos = _this.endpos || 0, time = 0.6;
      var dir = (_this.startpos>_this.endpos ? -1 : 1);
      if(pos>0) aPos = 0;
      else if(pos < max) aPos = Math.abs(max);
      else time = 0.3;
       if(!leave || (leave && aPos)) swipeset[_this.option.type].moveact.call(_this, dir, aPos, time, addPos);
      $this.off("mouseleave.swipeend").scrollLeft(0);
    },
    moveact : function(dir, aPos, time, addPos){
      var _this = this, $this = $.$(_this), max, isbtn, w;
      if(typeof aPos == "object") aPos=undefined;
      w = $this.width(), max = ((_this.$list.get(0).scrollWidth-w)*-1);
      if(aPos==undefined){
        if(_this.startpos==undefined) _this.startpos = 0;
        if(_this.endpos==undefined) _this.endpos = _this.$list.position().left;
        if(!dir) dir = (_this.startpos>_this.endpos ? -1 : 1);
        if(dir=="prev"||dir=="next") isbtn=true, dir = (dir=="next" ? -1 : 1);
        var $breakchild = _this.option.breakel ? _this.$list.find(_this.option.breakel) : [], time = 0.3, sc = Math.abs(_this.endpos);
        if(_this.option.breakel && $breakchild.length){
          var isNext = 0, isPrev = 0, isStop = false;
          $breakchild.each(function(){
            var _$child = $.$(this), pl = _$child.position().left, w2 = _$child.width(), pc = (sc - pl)/w2;
            if(dir<0 && pl<=sc && sc < pl+w2){
              aPos = _$child.next().length>0 ? _$child.next().position().left : pl; //다음
              if(_$child.next().length) _$child.next().find("a,button").trigger("click");
              return false;
            }else if(dir>0 && sc<=pl && sc+w > pl){
              aPos = _$child.prev().length>0 ? _$child.prev().position().left : pl; //이전
              if(_$child.prev().length) _$child.prev().find("a,button").trigger("click");
              return false;
            }
          });
          aPos = (Math.min(aPos, Math.abs(max)));
        }else{
          aPos = (sc*-1) + (dir*(isbtn?w:(addPos||80)));
          if(dir < 0)  aPos = Math.max(aPos, max);
          else aPos = Math.min(aPos, 0);
        }
      }else{
        if(aPos<0) aPos = 0;
        else aPos = (Math.min(aPos, Math.abs(max)));
      }
      _this.endpos=Math.abs(aPos)*-1;
      _this.$list.stop().animate({left: _this.endpos}, {"duration":(time||0.3)*1200,"easing":"easeOutQuint", complete:swipeset.btnset.bind(_this)});
    }
  },
  sizecheck : function($objs){
    $.each($objs||this.$objs, function(){
      var _this = this, $this = $.$(_this), swipeguide, pdl, pdr;
      $this.addClass("swipe-off"), swipeguide = $this.data("swipeguide"), pdl = parseFloat($this.css("padding-left")), pdr = parseFloat($this.css("padding-right"));
      $this.parents(":hidden").addClass("js-visible");
      if(!_this.$list || !_this.$list.length) return this;
      if(_this.offsetWidth-pdl-pdr >= _this.$list[0].scrollWidth){
        $this.addClass((swipeguide ? "swipe-guide ":"") + "swipe-off");
        _this.$list.stop().animate({left: 0}, {"duration":(0.3)*1000,"easing":"easeInOutQuad", complete:swipeset.btnset.bind(_this)});
      }else{
        $this.removeClass("swipe-off");
        if(($this.data("start")||!_this.option.touch) && _this.option.start && _this.$list && _this.$list.find(_this.option.start).length>0){
          var _$firstChild = _this.$list.children().first(), firstPos, $actel = _this.$list.find(_this.option.start);
          firstPos = $actel.position().left - (_$firstChild.position().left + parseFloat(_$firstChild.css("margin-left")) + parseFloat(_$firstChild.css("padding-left")));
          swipeset[_this.option.type].moveact.call(_this, 1, firstPos-Math.floor(($this.width()-$actel.width())/2));
        }else{
          swipeset[_this.option.type].moveact.call(_this);
        }
        swipeset.btnset.call(_this);
      }
      $this.parents(".js-visible").removeClass("js-visible");
    });
  },
  guidehide : function($obj){
    if($obj.data("swipeguide")) $obj.data("swipeguide", false).removeClass("swipe-guide");
  },
  btnset : function(){
    var _this = this, $this;
    if(_this.target) $this = _this.target.closest("[data-swipe]"), _this = $this.get(0);
    else $this = $.$(this);
    var l = Math.abs(parseFloat(_this.$list.css("left"))), w = _this.$list[0].scrollWidth, cw = $this.width();
    if(l+cw >= w) !$this.is(".swipe-last") && $this.addClass("swipe-last");
    else $this.is(".swipe-last") && $this.removeClass("swipe-last");
    if(l==0) !$this.is(".swipe-first") && $this.addClass("swipe-first");
    else $this.is(".swipe-first") && $this.removeClass("swipe-first");
    if(!_this || !_this.option || !_this.option.arrow) return false;
    var pdl = parseFloat($this.css("padding-left")), pdr = parseFloat($this.css("padding-right"));
    _this.option.arrow.prev.prop("disabled",(l==0) ? true : false);
    _this.option.arrow.next.prop("disabled",(w - cw <= (l+pdr)) ? true : false);
  },
  $objs : null,
  init : function($obj){
    if(!$obj.length) return false;
    this.$objs = $obj;
    var _option = {type:"case1",guide:false,touch:true,arrow:false,allow:"vertical",start:null,breakel:null};
    $.each($obj, function(){
      var _this = this, casename = _this.getAttribute("data-swipe"), $this = $(_this).attr("tabindex",0);
      _this.option = $.extend({}, _option, $this.data("swipe"));
      $this.data("swipeguide", _this.option.guide).addClass(_this.option.guide?"swipe-guide":"");
      _this.$list = $this.children().eq(0).addClass("swipe-cont");
      if(_this.option.arrow) $this.append('<button type="button" class="swipe-prev" disabled="disabled"><span class="ir">이전</span></button><button type="button" class="swipe-next" disabled="disabled"><span class="ir">다음</span></button>').promise().done(function(){
        _this.option.arrow = {"prev":$this.find(".swipe-prev"),"next":$this.find(".swipe-next")};
        _this.option.arrow.prev.off("click.swipePrev").on("click.swipePrev", $.proxy(swipeset[_this.option.type].moveact, _this, "prev"));
        _this.option.arrow.next.off("click.swipeNext").on("click.swipeNext", $.proxy(swipeset[_this.option.type].moveact, _this, "next"));
      });
      if(_this.option.start) $this.data("start", true);
      $this.data("$list",$this.children().eq(0).addClass("swipe-cont")).addClass("swipe-initialized");
      if(_this.option.touch) $this.swipe( { swipeStatus:swipeset[_this.option.type].move, excludedElements:"", allowPageScroll:_this.option.allow||"none", triggerOnTouchLeave:true, threshold:50 } );
      $this.off("focusin.swipeset").on("focusin.swipeset", swipeset[_this.option.type].keyboard.evset).off("focusout.swipeset").on("focusout.swipeset", swipeset[_this.option.type].keyboard.evkill).off("scroll.swipeset");
      _this.$list.off("focusin.swipesetlink","a,button,input,select,textarea").on("focusin.swipesetlink","a,button,input,select,textarea", function(){ this.focus({preventScroll:false}); _this.scrollLeft = 0;});
    });
    this.sizecheck.call(this);
  }
}

/* circle navigator */
var circlenav = {
  angleCenter : 270, anirepeat : null,
  degreesToRadians : function(degrees){
    return degrees * (Math.PI / 180);
  },
  getRadiusPosition : function(radius, angle){
    var _ = this, _x, _y;
    _x = Math.floor(radius * Math.cos(_.degreesToRadians(angle)));
    _y = Math.floor(radius * Math.sin(_.degreesToRadians(angle)));
    return {x : _x, y : _y};
  },
  setPosition : function(_obj, angle, isend){
    var _ = this, pos, _item;
    for (var i = angle, j = _obj.option.count-1; j >= 0; i -= _obj.option.angle, j--) {
      pos = _.getRadiusPosition(_obj.option.radius, i);
      _item = _obj.option.menu[j];
      _item.style[prefix.js+"Transform"] = "translate("+pos.x+"px,"+pos.y+"px)";
      if(isend){
        if(Math.abs(i-_.angleCenter)<=_obj.option.angle/2) _item.className += _item.className.match(/\bactive\b/) ? "" : " active";
        else if(_item.className.match(/\bactive\b/)) _item.className = _item.className.replace(/\bactive\b/gi,"");
      }
    }
  },
  move : function(e, phase, direction, distance, duration, fingers){
    var _obj = e.currentTarget, $obj = $.$(_obj), _ = circlenav;
    clearTimeout(_.anirepeat);
    if(phase=="start"){
      _obj.endpos = _obj.startpos;
      _obj.timeStamp = e.timeStamp;
    }
    if(direction==="left" || direction==="right"){
      var dir = (direction==="left") ? -1 : 1;
      _obj.endpos = _obj.startpos + ((distance/4*dir));
      _.setPosition.call(_, _obj, _obj.endpos, false);
      if(phase=="end" || phase=="cancel"){
        _.end.call(_obj, e, Math.abs(1-((e.timeStamp-_obj.timeStamp)/duration))*distance);
      }
    }
  },
  animove : function(_obj, _start, _end, _count){
    var _ = this;
    _obj.endpos = _count==0 ? _end : _start+((_end-_start)*0.2);
    _.setPosition.call(_, _obj, _obj.endpos, _count==0 ? true : false);
    if(_count==0) return;
    _count = _count*0.8;
    if(_count<1) _count = 0;
    _.anirepeat = setTimeout(_.animove.bind(_, _obj, _obj.endpos, _obj.startpos, _count), 10);
  },
  end : function(e, addPos){
    var _obj = e.currentTarget, $obj = $.$(_obj), _ = circlenav, leave;
    if(e&&e.type=="mouseleave") leave = true;
    var dir = (_obj.startpos>_obj.endpos ? -1 : 1), _endpos;
    _endpos = Math.round(Math.abs(_obj.endpos+(addPos*dir))/_obj.option.angle) * _obj.option.angle
    if(_endpos>_obj.option.min) _endpos = _obj.option.min;
    else if(_endpos<_obj.option.max) _endpos = _obj.option.max;
    _obj.startpos = _endpos;
    _.animove.call(_, _obj, _obj.endpos, _obj.startpos, 100);
  },
  update : function($obj){
    var _ = this, _obj = $obj.get(0);
    _obj.option.itemwidth = _obj.option.menu[0].offsetWidth;
    _obj.option.radius = Math.min(_obj.offsetWidth-(_obj.option.itemwidth), _obj.offsetHeight-(_obj.option.menu[0].offsetHeight)) / 2;
    _.setPosition.call(_, _obj, _obj.startpos, true);
  },
  init : function($obj){
    if(!$obj || $obj.length==0) return;
    var _ = this, _obj = $obj.get(0);
    _obj.option = $obj.data("circlenav");
    _obj.option.menu = _obj.querySelectorAll(".item");
    if(!_obj.option.angle) _obj.option.angle = 10;
    _obj.option.count = _obj.option.menu.length;
    if(!_obj.option.count) return;
    var _center = (_obj.option.menu.length-1)/2, _range = _obj.option.angle*_center;
    _obj.option.min = _.angleCenter+(_obj.option.angle*(_obj.option.menu.length-1));
    _obj.option.max = _.angleCenter;
    _obj.option.center = _.angleCenter+(_obj.option.angle*((_obj.option.menu.length-1)/2));
    _obj.startpos = _obj.option.center; //center 에서 시작
    _.update($obj);
    $obj.swipe({ swipeStatus:_.move, excludedElements:"", allowPageScroll:"none", triggerOnTouchLeave:true, threshold:10 });
    $obj.addClass("circlenav-initialized");
  }
}

//copy clipboard
function copyToClipboard(text) {
  var failFn = function(txt){ prompt("Press Ctrl+C to copy", txt); };
  if (window.clipboardData && window.clipboardData.setData) {
    return clipboardData.setData("Text", text), alert("페이지 주소가 복사되었습니다."); // IE specific code path to prevent textarea being shown while dialog is visible.
  } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy"), alert("페이지 주소가 복사되었습니다."); // Security exception may be thrown by some browsers.
    } catch (ex) {
      document.body.removeChild(textarea);
      failFn(text);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }else{
    failFn(text);
  }
}