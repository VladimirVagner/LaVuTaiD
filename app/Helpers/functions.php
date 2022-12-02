<?php

// Эта функция возвращает файл перевода JSON, используемый в языковой переменной locale расположенной в config/app.js
function translations_lang($json)
{
    if(!file_exists($json)) {
        return [];
    }
    return json_decode(file_get_contents($json), true);
}
