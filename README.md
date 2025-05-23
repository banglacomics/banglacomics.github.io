
# 📖 বাংলা কমিক্স ডাটাবেস

বাংলা কমিক্স ডাটাবেস একটি সহজ স্ট্যাটিক ওয়েবসাইট যেখানে বাংলা কমিক্সের ছবি এবং তাদের বিবরণ প্রদর্শিত হয়।  
প্রত্যেকটি ছবিতে ক্লিক করলে সেই ছবির বিস্তারিত আলাদা পেজে দেখা যাবে। 

---

## 🌟 বৈশিষ্ট্যসমূহ

- 📸 কমিক্স ছবির তালিকা
- 🖱️ ছবিতে ক্লিক করলে বিস্তারিত পেজ
- 🏠 প্রত্যেক পেজে হোম বাটন
- 🎨 মোবাইল ফ্রেন্ডলি ও রেস্পনসিভ ডিজাইন
- 💫 স্টিকি ও গ্রেডিয়েন্ট ব্যানার

---

## 📂 ফোল্ডার গঠন

```
/ (মূল ফোল্ডার)
├── index.html         (হোম পেজ)
├── details.html       (ডিটেইল পেজ)
├── styles.css         (স্টাইল)
├── script.js          (জাভাস্ক্রিপ্ট)
├── images.json        (ছবির তথ্য সংরক্ষণকারী ফাইল)
└── /images            (ছবির ফোল্ডার)
    ├── photo1.jpg
    ├── photo2.jpg
    └── photo3.jpg
```

---

## 🚀 কিভাবে কাজ করে

১. `index.html` ফাইল ওপেন করুন।  
২. কমিক্স ছবির লিস্ট দেখবেন।  
৩. যেকোনো ছবিতে ক্লিক করলে আপনি `details.html?id=0`, `id=1` ইত্যাদিতে চলে যাবেন।  
৪. সেখানে সংশ্লিষ্ট ছবি ও বিবরণ দেখানো হবে।  
৫. ব্যানারে থাকা 🏠 হোম বাটনে ক্লিক করে পুনরায় হোমপেজে ফিরতে পারবেন।

---

## 🔧 কিভাবে আপনার নিজের ছবি যুক্ত করবেন

১. `/images` ফোল্ডারে আপনার নতুন ছবি আপলোড করুন।  
২. `images.json` ফাইলে নতুন এন্ট্রি যোগ করুন। যেমন:

```json
[
    {
        "src": "images/photo1.jpg",
        "title": "কিরীটী রায়",
        "description": "একজন বিখ্যাত গোয়েন্দা চরিত্র।"
    },
    {
        "src": "images/photo2.jpg",
        "title": "ব্যোমকেশ বক্সী",
        "description": "অন্যতম জনপ্রিয় গোয়েন্দা।"
    }
]
```

---

## 📢 লাইভ ডেমো

আপনি GitHub Pages ব্যবহার করে এটি সরাসরি চালাতে পারেন!  
উদাহরণ:  
`https://yourusername.github.io/your-repo-name/`

---

## 📜 লাইসেন্স

এই প্রজেক্টটি ব্যক্তিগত ব্যবহারের জন্য উন্মুক্ত।  
কিন্তু কোন কনটেন্ট (ছবি বা লেখা) ব্যবহারের আগে কপিরাইট মেনে চলুন।

---

# ধন্যবাদ! 🎉  
**বাংলা কমিক্সকে ডিজিটাল জগতে ছড়িয়ে দিই!**
