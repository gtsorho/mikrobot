<template>
<footer class="footer py-4" style="opacity: 1;">
    <!-- CONTAINER -->
    <div class="container foorow-1 foorow">
        <div class="row">
            <div class="col-md-4 col-sm-6 fabout">
                <h3><a href="about_1.html">About Us</a></h3>
                <p >Our Mission is to inspire, unlock creativity, innovation and passion for science and technology for young Ghanaians, by using the motivational effects of robotics to develop science, engineering and technology skills (STEM).</p>
            </div>
            <div class="col-md-3 col-sm-6">
                <h3><a href="elements_recent_works.html"></a></h3>
                <nav>
                    <ul class="recentworks clearfix">
                        <li>
                            <!-- <a href="elements_recent_works.html"><img src="images/imgs/img-recent-work-1.jpg" alt=""></a> -->
                        </li>
                        <li>
                            <!-- <a href="elements_recent_works.html"><img src="images/imgs/img-recent-work-2.jpg" alt=""></a> -->
                        </li>
                        <li>
                            <!-- <a href="elements_recent_works.html"><img src="images/imgs/img-recent-work-3.jpg" alt=""></a> -->
                        </li>
                        <li>
                            <!-- <a href="elements_recent_works.html"><img src="images/imgs/img-recent-work-4.jpg" alt=""></a> -->
                        </li>
                        <li>
                            <!-- <a href="elements_recent_works.html"><img src="images/imgs/img-recent-work-5.jpg" alt=""></a> -->
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="col-md-2 col-sm-6">
                <h3><a href="sitemap.html">Links</a></h3>
                <nav>
                    <ul class="links">
                        <li><router-link class="nav-link" :to="{name:'home'}">Go To Home</router-link></li>
                        <li><router-link class="nav-link" :to="{name:'about'}">About US</router-link></li>
                        <li><router-link class="nav-link" :to="{name:'level'}">Academy | Grades</router-link></li>
                        <li><router-link class="nav-link" :to="{name:'profile'}">Student Profiles</router-link></li>
                        <li><router-link class="nav-link" :to="{name:'gallery'}">Gallery</router-link></li>
                    </ul>
                </nav>
            </div>
            <div class="col-md-3 col-sm-6">
                <h3><a href="blog_standart.html">Contact Us</a></h3>
                <nav>
                    <ul class="latestposts">
                        <li>
                            <a href="blog_single_post_photo.html">CSIR-INSTI (Kaukudi, Accra)</a>
                            <div class="date">NARH-BITA Collage (Community 4, Tema)</div>
                        </li>
                        <li class="mt-3">
                            <a href="blog_single_post_vimeo.html" class="mt-3">Phone</a>
                            <div class="date">- 024 763 2002</div>
                            <div class="date">- 020 816 0966</div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
    <!-- /.container -->

    <div class="separator foorow-1 foorow"></div>

    <!-- CONTAINER -->
    <div class="container">
        <div class="row foorow-3 foorow">
            <div class="col-md-6 col-sm-7">
                <a href="index.html" class="logo">Mikrobot</a>
                <p>© 2023 Mikrobot. All Rights Reserved</p>
            </div>
            <div class="col-md-6 col-sm-5 ">
                <ul class="social pull-right m-0 d-flex justify-content-end ">
                    <li><a href="https://www.linkedin.com/company/mikrobot-academy/"><i class="bi bi-twitter"></i></a></li>
                    <li><a href="https://www.facebook.com/mikrobotacademy"><i class="bi bi-facebook"></i></a></li>
                    <li><a href="https://www.linkedin.com/company/mikrobot-academy/"><i class="bi bi-linkedin"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- /.container -->
</footer>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .footer {
        background-color: #243050;
        color: #ffffff !important;
        font-size: 16px;
        line-height: 24px;
        opacity: 0;
    }
    p{
        font-weight: 200;
        color: #e9e9e9;
    }
    a{
        color: #e9e9e9 !important   ;
    }    
    h3{
        line-height: 30px;
        font-weight: 200;
        letter-spacing: -1px;
        font-size: 24px;
    }
    ul{
          list-style: none;
          padding-left: 0rem;
    }
    li,a.p{
        font-weight: 200;
    }
    .pull-right {
        /* float: right !important; */
          margin-top: 15px !important;
    }
    .footer .social li {
        float: left;
        font-size: 24px;
        margin: 0 0 0 17px;
    }
    .social li{
        height: min-content ;
    }
</style>