const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// قراءة الملفات الثابتة من نفس المجلد أو المجلد الحالي
app.use(express.static(path.join(__dirname)));

// ملف حفظ المنتجات عشان يظهر لكل الأجهزة
const DATA_FILE = path.join(__dirname, 'products.json');

// جلب المنتجات
app.get('/api/products', (req, res) => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            return res.json([]);
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        res.json(JSON.parse(data || '[]'));
    } catch (err) {
        res.status(500).json({ error: 'Failed to read products' });
    }
});

// إضافة منتج جديد من أي جهاز
app.post('/api/products', (req, res) => {
    try {
        const newProduct = req.body;
        let products = [];
        if (fs.existsSync(DATA_FILE)) {
            products = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]');
        }
        products.push(newProduct);
        fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
        res.json({ success: true, product: newProduct });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save product' });
    }
});

app.listen(PORT, () => {
    console.log(`Hertz Server running on port ${PORT}`);
});
