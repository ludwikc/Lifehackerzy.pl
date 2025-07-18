<!DOCTYPE html>
<html lang="pl">
<head>
    <?php include 'partials/head.html'; ?>
</head>

<body>
    <div class="page-wrapper">
        
        <!-- Preloader -->
        <div class="loader-wrap">
            <div class="preloader">
                <div class="preloader-close">x</div>
                <div id="handle-preloader" class="handle-preloader">
                    <div class="animation-preloader">
                        <div class="txt-loading">
                            <span data-text-preloader="L" class="letters-loading">L</span>
                            <span data-text-preloader="I" class="letters-loading">I</span>
                            <span data-text-preloader="F" class="letters-loading">F</span>
                            <span data-text-preloader="E" class="letters-loading">E</span>
                            <span data-text-preloader="H" class="letters-loading">H</span>
                            <span data-text-preloader="A" class="letters-loading">A</span>
                            <span data-text-preloader="C" class="letters-loading">C</span>
                            <span data-text-preloader="K" class="letters-loading">K</span>
                            <span data-text-preloader="E" class="letters-loading">E</span>
                            <span data-text-preloader="R" class="letters-loading">R</span>
                            <span data-text-preloader="Z" class="letters-loading">Z</span>
                            <span data-text-preloader="Y" class="letters-loading">Y</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Preloader End -->
        
        <?php include 'partials/header.html'; ?>
        
        <!-- Main Content Sections -->
        <?php include 'sections/hero-banner.html'; ?>
        <?php include 'sections/solution-explanation.html'; ?>
        <?php include 'sections/features-carousel.html'; ?>
        <?php include 'sections/livechat.html'; ?>
        <?php include 'sections/statistics.html'; ?>
        <?php include 'sections/conversation.html'; ?>
        <?php include 'sections/protipy-tiles.html'; ?>
        <?php include 'sections/toolbox.html'; ?>
        <?php include 'sections/testimonials.html'; ?>
        <?php include 'sections/tools-showcase.html'; ?>
        <?php include 'sections/pricing.html'; ?>
        <?php include 'sections/team.html'; ?>
        <?php include 'sections/course-modules.html'; ?>
        <?php include 'sections/workshops.html'; ?>
        <?php include 'sections/faq.html'; ?>
        
        <?php include 'partials/footer.html'; ?>
        
        <!-- Scroll To Top -->
        <div class="scroll-to-top scroll-to-target" data-target="html">
            <span class="fa fa-arrow-up"></span>
        </div>
        
    </div>
    
    <?php include 'partials/scripts.html'; ?>
    
</body>
</html>