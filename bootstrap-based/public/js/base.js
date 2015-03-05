/* 控制导航按钮动作 */
function nav_click() {
  is_display = $("#nav_btn").attr('is_display');
  console.dir($("#nav_btn").attr('is_display'));
  if (is_display == 'true') {
    hide_nav();
  } else {
    show_nav();
  }
}

function hide_nav() {
  /* 隐藏左侧aside */
    $('.aside').removeClass('visible-md visible-lg').addClass('hidden-md hidden-lg');
    /* 右侧内容最大化 */
    $('.aside3').removeClass('col-md-8 col-lg-8').addClass('col-md-12 col-lg-12');
    /* 修改文字排版 */
    $('.aside3-content').removeClass('col-md-12').addClass('col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2');
    $("#nav_btn").attr('is_display', 'false');
    console.dir($("#nav_btn").attr('is_display'));
}

function show_nav() {
  /* 显示左侧aside */
    $('.aside').removeClass('hidden-md hidden-lg').addClass('visible-md visible-lg');
    /* 调整右侧内容 */
    $('.aside3').removeClass('col-md-12 col-lg-12').addClass('col-md-8 col-lg-8');
    /* 调整文字内容格式 */
    $('.aside3-content').removeClass('col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2').addClass('col-md-12');
    $("#nav_btn").attr('is_display', 'true');
    console.dir($("#nav_btn").attr('is_display'));
}

/* 控制文章章节列表按钮 */
function content_click() {
  is_show = !$(this).data('clicked');
  if (is_show) {
    $('#content_table').show();
  } else {
    $('#content_table').hide();
  }
  $(this).data('clicked', is_show);
}

function content_effects() {
  //remove the asidebar
  $('.row-offcanvas').removeClass('active');
  if ($("#nav").length > 0) {
    $("#content > h2,#content > h3,#content > h4,#content > h5,#content > h6").each(function(i) {
      var current = $(this);
      current.attr("id", "title" + i);
      tag = current.prop('tagName').substr(-1);
      $("#nav").append("<div style='margin-left:" + 15 * (tag - 1) + "px'><a id='link" + i + "' href='#title" + i + "'>" + current.html() + "</a></div>");
    });
    $("pre").addClass("prettyprint");
    prettyPrint();
    $('#content img').addClass('img-thumbnail').parent('p').addClass('center');
    $('#content_btn').show();
  } else {
    $('#content_btn').hide();
  }
}

$(document).ready(function() {
  /* 控制左侧 aside 的动作 */
  $("#nav_btn").on('click', function() {
    nav_click();
  });

  $('body').on('click', '#content_btn' , function() {
    content_click();
  });

  $(document).pjax('.pjaxlink', '#pjax', {
    fragment: "#pjax",
    timeout: 10000
  });

  $(document).on("pjax:end", function() {
    if ($("body").find('.container').width() < 992) {
      show_nav();
    }
    $('.aside3').scrollTop(0);
    content_effects();
  });

  $('body').on('click', '.show-commend', function() {
    var ds_loaded = false;
    window.disqus_shortname = $('.show-commend').attr('name');
    $.ajax({
      type: "GET",
      url: "http://" + disqus_shortname + ".disqus.com/embed.js",
      dataType: "script",
      cache: true
    });
  });
  content_effects();
});