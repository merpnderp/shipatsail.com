<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="canonical" href="https://shipatsail.com/" />
  <link rel="icon" type="image/png" href="images/icon.png">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://unpkg.com/tachyons@4.7.0/css/tachyons.min.css" />
</head>

<body class="">
  <nav class="db dt-l center w-100 border-box pa3 ph5-l bb b--light-gray shadow-1 ">
  <a class="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l b " href="/ " title="Kaleb Murphy ">
      Kaleb Murphy
    <!--<img src="http://tachyons.io/img/logo.jpg " class="dib w2 h2 br-100 " alt="Site Name ">-->
    </a>
  <div class="db dtc-l v-mid w-100 w-75-l tc tr-l ">
    <a class="link dim dark-gray f6 f5-l dib mr3 mr4-l " href="/" title="Consulting ">Consulting</a>
    <a class="link dim dark-gray f6 f5-l dib mr3 mr4-l " href="/blog.html " title="Blog ">Blog</a>
    <!-- <a class="link dim dark-gray f6 f5-l dib mr3 mr4-l " href="/resources.html " title="Blog ">Resources</a> -->
    <a class="link dim dark-gray f6 f5-l dib " href="mailto:kalebmurphy@shipatsail.com" title="Contact ">Contact</a>
  </div>
</nav>
  <div class="center mw10 ph3-ns ">
    <div class="cf ph2-ns ">
      <div class="fl w-100 w-60-ns pa2 ">
        <div class="bg-white pt4 ">
          <p class="f1 fw6 lh-title ">Solve problems faster, with less hassle.</p>
          <p class="f4 lh-copy"> My name is Kaleb Murphy. I help companies and people just like you.</p>
        </div>
      </div>
      <div class="fl w-100 w-40-ns pa2 mt4 dn db-ns ">
        <div class="bg-white pv4 show1">
          <ul class="list pl0">
            <li>Customer acquisition: growth, retention, revenue, ROI</li>
            <li>Modernize your legacy Javascript applications with React</li>
            <li>New front ends for existing WebAPI's</li>
            <li>Mobile applications to reach your customers everywhere</li>
            <li>Custom development</li>
            <li>Third party integration</li>
        </div>
      </div>
    </div>
  </div>
  <div class="center w-90 show2">
    <hr/>
  </div>
  <div class="center mw10 ph3-ns show2">
    <div class="cf ph2-ns ">
      <div class="fl w-100 w-80-ns pa2 ">
        <p class="f2 lh-copy pt0 mt0">You should contact me if any of these are true...</p>
        <ul class="f3">
          <li>You don't have the skills in house to create profitable applications and services.</li>
          <li>You need third party applications integrated, but don't know where to start.</li>
          <li>You need better insight into the effects of your marketing campaigns.</li>
          <li>Your site has high customer acquisition costs.</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="center w-90 show3">
    <hr/>
  </div>
  <div class="center mw10 ph3-ns show3">
    <div class="cf ph2-ns ">
      <div class="fl w-100 w-60-ns pa2 ">
        <p class="f2 lh-copy">Interested in working together? <a href="mailto:kalebmurphy@shipatsail.com">Let’s talk.</a></p>
      </div>
    </div>
  </div>
  <footer class="pv4 ph3 ph5-m ph6-l mid-gray">
  <small class="f6 db tc">© 2017 <b class="ttu">Ship at Sail, LLC, and Kaleb Murphy</b></small>
</footer>
  <script src="https://unpkg.com/scrollreveal/dist/scrollreveal.min.js"></script>
  <script>
    window.sr = ScrollReveal();
    sr.reveal('.show1', { delay: 200 });
    sr.reveal('.show2', { delay: 300 });
    sr.reveal('.show3', { delay: 300 });
  </script>
</body>

</html>