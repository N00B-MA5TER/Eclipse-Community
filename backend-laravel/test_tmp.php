<?php
$temp = tmpfile();
if ($temp === false) {
    echo "Failed to create temp file!\n";
} else {
    echo "Temp file created successfully.\n";
    $meta = stream_get_meta_data($temp);
    echo "Temp file path: " . $meta['uri'] . "\n";
}
