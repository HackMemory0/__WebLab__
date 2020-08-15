<?php
if (!defined('LAB1')) die();

?>


<table class="mainbox">
    <tr>
        <td><h1>HISTORY:</h1></td>
    </tr>

    <?php foreach ($_SESSION['results'] as $result): ?>
    <tr>
        <td>
            <a><?='x:' . $result['x'] . '  y:' . $result['y'] . '  r:' . $result['r'] . '  result:' . ($result['result'] ? 'true' : 'false') . '  time:' . $result['calcTime'] ?> </a>
        </td>
    </tr>
    <?php endforeach; ?>
</table>
