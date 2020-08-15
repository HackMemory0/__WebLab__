<?php

use WebLab\Utils\Utilites;

if (!defined('LAB1')) die();

?>


<form action="<?= Utilites::url(__DIR__.'../../../../index.php'); ?>" method="get" id="form">
    <table class="mainbox">
        <tr>
            <td><label for="x-input">X: </label></td>
            <td>
                <label><input type="checkbox" name="x[]" value="-3" />-3 </label>
                <label><input type="checkbox" name="x[]" value="-2" />-2 </label>
                <label><input type="checkbox" name="x[]" value="-1" />-1 </label>
                <label><input type="checkbox" name="x[]" value="0" />0 </label>
                <label><input type="checkbox" name="x[]" value="1" />1 </label>
                <label><input type="checkbox" name="x[]" value="2" />2 </label>
                <label><input type="checkbox" name="x[]" value="3" />3 </label>
                <label><input type="checkbox" name="x[]" value="4" />4 </label>
                <label><input type="checkbox" name="x[]" value="5" />5 </label>
                <!--
         --></td>
        </tr>
        <tr>
            <td><label for="y-input">Y: </label></td>
            <td><input type="text" name="y" id="y-input" /></td>
        </tr>
        <tr>
            <td><label for="r-input">R: </label></td>
            <td><input type="text" name="r" id="r-input" /></td>
        </tr>
        <tr>
            <td colspan="2"><input type="submit" value="Нажми на меня"></td>
        </tr>
    </table>
</form>
