<?php
require 'vendor/autoload.php';

use Slim\Factory\AppFactory;

$app = AppFactory::create();

$app->get('/products', function ($request, $response, $args) {
    // Mock data, in real life scenario you will get these data from a database
    $products = [];
    for($i = 0; $i < 4; $i++) {
        $product = [
            'id' => $i + 1,
            'name' => "Product " . ($i + 1),
            'price' => rand(100, 1000),
            'image' => "http://example.com/products/images/product" . ($i + 1) . ".jpg",
            'description' => "Description of Product " . ($i + 1),
            'stock' => rand(1, 100)
        ];
        array_push($products, $product);
    }

    $payload = json_encode($products);
    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();

?>