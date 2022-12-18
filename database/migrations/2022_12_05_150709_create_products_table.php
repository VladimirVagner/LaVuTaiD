<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('barcode', 50)->unique();
            $table->unsignedInteger('tbp_id');
            $table->string('title')->index();
            $table->foreignId('brand_id')->constrained('brands')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->foreignId('category_id')->constrained('categories')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->unsignedTinyInteger('status');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
