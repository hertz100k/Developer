const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// مصفوفة لتخزين المنتجات بشكل حي ومباشر لكل الأجهزة
let products = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// إرسال المنتجات الحالية لأي جهاز يفتح الموقع
app.get('/api/products', (req, res) => {
    res.json(products);
});

// استقبال المنتج الجديد من أي أدمن (سواء من الكمبيوتر أو التليفون) وحفظه للجميع
app.post('/api/products', (req, res) => {
    const newProduct = {
        id: Date.now(),
        name: req.body.name,
        price: req.body.price,
        image: req.body.image
    };
    products.push(newProduct);
    res.redirect('/'); // إعادة توجيه للصفحة الرئيسية ليظهر المنتج فوراً
});

// تشغيل ملف الـ HTML الأساسي بتاعك (افترضنا إن اسم ملفك index.html)
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
    console.log(`🚀 نظام شركة هيرتز شغال مباشر على البورت: ${PORT}`);
});
