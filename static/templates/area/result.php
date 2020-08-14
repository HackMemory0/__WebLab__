<?php
if (!defined('LAB1')) die();

?>

<table class="mainbox">
    <tr>
        <td><label>X: </label></td>
        <td><label><?=$x?></label></td>
    </tr>

    <tr>
        <td><label>Y: </label></td>
        <td><label><?=$y?></label></td>
    </tr>

    <tr>
        <td><label>R: </label></td>
        <td><label><?=$r?></label></td>
    </tr>

    <tr>
        <td><label>Result: </label></td>
        <td><label>point <?=$res ? ' included' : " not included"?></label></td>
    </tr>
</table>