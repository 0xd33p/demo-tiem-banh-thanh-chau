(function(){
  // Hiệu ứng hiện dần khi cuộn
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){io.observe(el);});
  } else els.forEach(function(el){el.classList.add('in');});

  // Trạng thái mở cửa theo giờ Việt Nam (08:00–20:00 mỗi ngày)
  var b=document.getElementById('openBadge');
  try{
    var h=+new Intl.DateTimeFormat('en-GB',{hour:'2-digit',hour12:false,timeZone:'Asia/Ho_Chi_Minh'}).format(new Date());
    var open=h>=8&&h<20;
    b.textContent=open?'● Đang mở cửa · đến 20:00':'● Đã đóng cửa · mở lúc 08:00';
    b.classList.add(open?'is-open':'is-closed');
  }catch(e){}

  // Nền thanh điều hướng khi cuộn
  var nav=document.querySelector('.nav');
  var onS=function(){nav.classList.toggle('scrolled',window.scrollY>20);};
  window.addEventListener('scroll',onS,{passive:true});onS();

  // Xem ảnh lớn
  var lb=document.getElementById('lb'),li=lb.querySelector('img');
  document.querySelectorAll('.g').forEach(function(g){
    g.addEventListener('click',function(){li.src=g.dataset.full;li.alt=g.querySelector('img').alt;lb.hidden=false;document.body.style.overflow='hidden';});
  });
  function close(){lb.hidden=true;li.src='';document.body.style.overflow='';}
  lb.addEventListener('click',function(e){if(e.target!==li)close();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!lb.hidden)close();});
})();
