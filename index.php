<!doctype html>
<html lang="en" ng-app="conversionApp">

<head>
  <?php include 'partials/sharedhead.php'; ?>
  <title>Word to Line Rates | Conversion tool for Translators</title>
  <meta name="description" content="The Word to Line Rates App helps translators easily convert per word to per line rates using EU statistics.">
</head>

<?php include 'partials/beforecontent.php'; ?>

<!-- Calculator -->
<div class="col-xs-9 col-md-6 col-lg-7 calculator" ng-view></div>

<?php include 'partials/aftercontent.php'; ?>

</body>

</html>
