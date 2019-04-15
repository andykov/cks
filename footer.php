<?if (!defined("TEMPLATE_SHORT_FOOTER") || TEMPLATE_SHORT_FOOTER === false){

    if (LANGUAGE_ID == 'ru'){
        require_once('ru/footer.php');
    } else {
        require_once('en/footer.php');
    }

}?>
    <div id="site-preloader" style="width: 100%; height: 100%; opacity: 0.5; position: fixed; left:0; top: 0; background: url(/images/site-preloader.gif) no-repeat 49% 50% #000; z-index: 1000000; display: none;"></div>


    <script>
        $(document).ready(function() {
            $(".js-popup-regions").fancybox({
                padding: [30,30,30,45],
                autoSize: true,
                width: '500px',
                helpers : {
                    overlay : {
                        locked: false
                    }
                }
            });
        });
    </script>
</main>
<div id="notifies-block" style="position: fixed; right: 0; bottom: 0; max-width: 300px;"></div>
<?$GLOBALS['APPLICATION']->includeFile('/include/jivosite.php');?>
</body>
</html>

