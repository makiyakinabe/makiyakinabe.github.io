/* Jiak Clean v4: features from the persona playtest, layered on the v3 core */
(function () {
const KEY4 = 'platesave-proto-v4';
Object.assign(IC, {
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  magnet: '<path d="M6 4v8a6 6 0 0 0 12 0V4"/><path d="M6 8h4M14 8h4"/>',
  leaf: '<path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z"/><path d="M5 19 13 11"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'
});
document.head.insertAdjacentHTML('beforeend', '<style>.ps .src{display:block;font-size:12px;line-height:1.35;color:#5E6862;font-weight:500;letter-spacing:.01em}.ps .src b{font-weight:700}.ps .ig{display:grid;gap:8px}.ps .ig3{grid-template-columns:repeat(3,1fr)}.ps .ig2{grid-template-columns:1fr 1fr}.ps .igt{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;text-align:center;gap:3px;padding:10px 6px;border-radius:14px;background:#F6F7F2}.ps .igt b{font-size:22px;line-height:1;font-weight:800}.ps .igt span{font-size:13px;font-weight:600;color:#3D453F;line-height:1.2}.ps .hb{display:grid;grid-template-columns:76px 1fr;gap:6px 8px;align-items:center;font-size:13px;font-weight:700;color:#3D453F}.ps .hb .tr{position:relative;height:18px;border-radius:9px;background:#EEF0EA}.ps .hb .tr i{position:absolute;left:0;top:0;bottom:0;border-radius:9px}.ps .hb .tr em{position:absolute;right:6px;top:0;font-style:normal;font-size:13px;font-weight:800;line-height:18px}.ps .steps3{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.ps .steps3 div{display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center;font-size:13px;font-weight:700;color:#3D453F}.ps .steps3 svg{background:#F1F7F2;border-radius:16px;padding:8px}</style>');
window.SRC = t => '<span class="src"><b>Source:</b> ' + t + '</span>';
window.IG = {
  tile: (big, label, col, pic) => '<div class="igt">' + (pic || '') + '<b style="color:' + (col || '#18201A') + '">' + big + '</b><span>' + label + '</span></div>',
  ring: (pct, col, label) => '<div class="igt"><svg width="58" height="58" viewBox="0 0 42 42" aria-hidden="true"><circle cx="21" cy="21" r="16" fill="none" stroke="#E3E6DE" stroke-width="6"/><circle cx="21" cy="21" r="16" fill="none" stroke="' + col + '" stroke-width="6" stroke-dasharray="' + (pct * 1.005).toFixed(1) + ' 100.5" transform="rotate(-90 21 21)" stroke-linecap="round"/><text x="21" y="25" text-anchor="middle" font-size="11" font-weight="800" fill="#18201A" font-family="Figtree,sans-serif">' + pct + '%</text></svg><span>' + label + '</span></div>',
  hbars: rows => '<div class="hb">' + rows.map(r => '<span>' + r[0] + '</span><span class="tr"><i style="width:' + r[1] + '%;background:' + r[2] + '"></i>' + (r[3] ? '<em style="color:' + (r[1] > 70 ? '#fff' : '#18201A') + '">' + r[3] + '</em>' : '') + '</span>').join('') + '</div>'
};
document.head.insertAdjacentHTML('beforeend', '<style>.ps.locked .status{background:#0F1F17;color:#fff}.ps.locked .status .notch{background:#000}</style>');

/* ---------- words ---------- */
const TXT = {
  en: {gm:'Good morning', ga:'Good afternoon', ge:'Good evening', shared:'Shared with your family', plan:'Help me plan meals', plan_sub:'Tap and tell me what you have', first:'Cook these first', used:'I used it', freeze:'Freeze it', safe:'Is this still safe?', meals:'Meals', meals_sub:'Easy recipes from your kitchen', start:'Start cooking', min:'minutes', uses:'uses', none:'Nothing ready to cook. Tap “Help me plan meals” on Today.', help:'Help', help_sub:'We’re here for you', safe_sub:'Careful answers by type of food', talk:'Talk to a person', talk_sub:'A volunteer or your family', settings:'Settings', today:'Today', lang:'Language', save:'Save my recipe', save_sub:'Say it out loud and we write it down', book:'Family recipe book', carer:'Shared with Anita (daughter)', carer_sub:'She can see your kitchen and add food', listening:'Listening…', trythis:'TRY THIS', again:'Try again', care_warn:'Handle with care: this date matters for safety.', d_today:'Use today', d_tom:'Tomorrow', d_days:' days', safe_q:'Which food?', another:'Ask about another food', risk_hi:'High-risk food. If in doubt, throw it out.', h_title:'Today’s kitchen', h_sub:'Helper view · Maria', h_urgent:'Use these first', h_tonight:'Tonight', h_cooking:'You’re cooking', h_notcook:'Not decided yet', h_list:'Shopping list (approved)', h_bought:'Bought', h_left:'Leftovers', h_privacy:'Jiak Clean shows food waste for the whole household, never who threw something away.', h_req:'Suggest an item', h_reqd:'Suggested to your employer', shop:'Shopping', kitchen:'Kitchen', h_kitchen:'Everything in the kitchen', h_open:'Open recipe', used_s:'Used', freeze_s:'Freeze', h_get:'I’ll get it', h_getting:'You’re getting this', nothing:'Nothing urgent today.'},
  zh: {gm:'早上好', ga:'下午好', ge:'晚上好', shared:'与家人共享', plan:'帮我计划三餐', plan_sub:'按一下，告诉我你有什么', first:'先煮这些', used:'我用了', freeze:'冷冻起来', safe:'还能吃吗？', meals:'餐点', meals_sub:'用家里现有的食材做简单的菜', start:'开始煮', min:'分钟', uses:'用到', none:'暂时没有能做的菜。请在“今天”页按“帮我计划三餐”。', help:'帮助', help_sub:'我们随时帮你', safe_sub:'按食物种类给出谨慎的建议', talk:'找人谈谈', talk_sub:'义工或你的家人', settings:'设置', today:'今天', lang:'语言', save:'保存我的食谱', save_sub:'说出来，我们帮你记下', book:'家传食谱', carer:'已与 Anita（女儿）共享', carer_sub:'她可以看到你的厨房并添加食物', listening:'正在听…', trythis:'试试这道', again:'再说一次', care_warn:'请小心：这个日期关乎食品安全。', d_today:'今天吃', d_tom:'明天', d_days:' 天', safe_q:'哪一种食物？', another:'问另一种食物', risk_hi:'高风险食物。有疑问就丢掉。'},
  ms: {gm:'Selamat pagi', ga:'Selamat petang', ge:'Selamat malam', shared:'Dikongsi dengan keluarga anda', plan:'Bantu saya rancang makanan', plan_sub:'Tekan dan beritahu apa yang anda ada', first:'Masak ini dahulu', used:'Saya sudah guna', freeze:'Bekukan', safe:'Masih selamat dimakan?', meals:'Hidangan', meals_sub:'Resipi mudah dari dapur anda', start:'Mula masak', min:'minit', uses:'guna', none:'Tiada hidangan yang sedia. Tekan “Bantu saya rancang makanan” di halaman Hari ini.', help:'Bantuan', help_sub:'Kami sedia membantu', safe_sub:'Jawapan berhati-hati ikut jenis makanan', talk:'Bercakap dengan seseorang', talk_sub:'Sukarelawan atau keluarga anda', settings:'Tetapan', today:'Hari ini', lang:'Bahasa', save:'Simpan resipi saya', save_sub:'Sebut dengan kuat, kami tuliskan', book:'Buku resipi keluarga', carer:'Dikongsi dengan Anita (anak perempuan)', carer_sub:'Dia boleh lihat dapur anda dan tambah makanan', listening:'Sedang mendengar…', trythis:'CUBA INI', again:'Cuba lagi', care_warn:'Berhati-hati: tarikh ini penting untuk keselamatan.', d_today:'Guna hari ini', d_tom:'Esok', d_days:' hari', safe_q:'Makanan apa?', another:'Tanya makanan lain', risk_hi:'Makanan berisiko tinggi. Jika ragu, buang.'},
  ta: {gm:'காலை வணக்கம்', ga:'மதிய வணக்கம்', ge:'மாலை வணக்கம்', shared:'உங்கள் குடும்பத்துடன் பகிரப்பட்டது', plan:'உணவு திட்டமிட உதவுங்கள்', plan_sub:'தட்டி, உங்களிடம் என்ன இருக்கிறது என்று சொல்லுங்கள்', first:'இவற்றை முதலில் சமையுங்கள்', used:'பயன்படுத்திவிட்டேன்', freeze:'உறைய வையுங்கள்', safe:'இது இன்னும் பாதுகாப்பானதா?', meals:'உணவுகள்', meals_sub:'உங்கள் சமையலறையிலிருந்து எளிய சமையல் குறிப்புகள்', start:'சமைக்கத் தொடங்குங்கள்', min:'நிமிடங்கள்', uses:'பயன்படுத்துவது', none:'சமைக்கத் தயாராக எதுவும் இல்லை. இன்று பக்கத்தில் “உணவு திட்டமிட உதவுங்கள்” என்பதைத் தட்டுங்கள்.', help:'உதவி', help_sub:'நாங்கள் உங்களுக்காக இருக்கிறோம்', safe_sub:'உணவு வகைக்கு ஏற்ற கவனமான பதில்கள்', talk:'ஒருவருடன் பேசுங்கள்', talk_sub:'தன்னார்வலர் அல்லது உங்கள் குடும்பம்', settings:'அமைப்புகள்', today:'இன்று', lang:'மொழி', save:'என் சமையல் குறிப்பைச் சேமி', save_sub:'சத்தமாகச் சொல்லுங்கள், நாங்கள் எழுதுகிறோம்', book:'குடும்ப சமையல் புத்தகம்', carer:'அனிதாவுடன் (மகள்) பகிரப்பட்டது', carer_sub:'அவர் உங்கள் சமையலறையைப் பார்த்து உணவைச் சேர்க்கலாம்', listening:'கேட்கிறது…', trythis:'இதை முயற்சிக்கவும்', again:'மீண்டும் முயற்சிக்கவும்', care_warn:'கவனமாக இருங்கள்: இந்த தேதி பாதுகாப்புக்கு முக்கியம்.', d_today:'இன்றே பயன்படுத்துங்கள்', d_tom:'நாளை', d_days:' நாட்கள்', safe_q:'எந்த உணவு?', another:'வேறு உணவைப் பற்றி கேளுங்கள்', risk_hi:'அதிக ஆபத்துள்ள உணவு. சந்தேகம் இருந்தால் வீசிவிடுங்கள்.'},
  tl: {h_title:'Kusina ngayong araw', h_sub:'View ng helper · Maria', h_urgent:'Gamitin muna ang mga ito', h_tonight:'Mamayang gabi', h_cooking:'Ikaw ang magluluto', h_notcook:'Hindi pa napagpapasyahan', h_list:'Listahan ng bibilhin (aprubado)', h_bought:'Nabili na', h_left:'Mga tira', h_privacy:'Ipinapakita ng Jiak Clean ang nasayang na pagkain ng buong sambahayan, hindi kung sino ang nagtapon.', h_req:'Magmungkahi ng item', h_reqd:'Naimungkahi sa amo', today:'Ngayon', shop:'Pamimili', kitchen:'Kusina', h_kitchen:'Lahat ng nasa kusina', h_open:'Buksan ang recipe', used_s:'Nagamit', freeze_s:'I-freeze', lang:'Wika', d_today:'Gamitin ngayon', d_tom:'Bukas', d_days:' araw', h_get:'Ako ang bibili', h_getting:'Ikaw ang bibili nito', nothing:'Walang kailangang gamitin ngayon.'},
  id: {h_title:'Dapur hari ini', h_sub:'Tampilan asisten · Maria', h_urgent:'Gunakan ini dulu', h_tonight:'Malam ini', h_cooking:'Kamu yang memasak', h_notcook:'Belum diputuskan', h_list:'Daftar belanja (disetujui)', h_bought:'Sudah dibeli', h_left:'Sisa makanan', h_privacy:'Jiak Clean menampilkan sisa makanan untuk seluruh rumah tangga, bukan siapa yang membuangnya.', h_req:'Usulkan barang', h_reqd:'Sudah diusulkan ke majikan', today:'Hari ini', shop:'Belanja', kitchen:'Dapur', h_kitchen:'Semua isi dapur', h_open:'Buka resep', used_s:'Sudah dipakai', freeze_s:'Bekukan', lang:'Bahasa', d_today:'Pakai hari ini', d_tom:'Besok', d_days:' hari', h_get:'Saya yang beli', h_getting:'Kamu yang membeli ini', nothing:'Tidak ada yang mendesak hari ini.'}
};
const DAYS_L = {zh:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'], ms:['Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu','Ahad'], ta:['திங்கள்','செவ்வாய்','புதன்','வியாழன்','வெள்ளி','சனி','ஞாயிறு'], tl:['Lunes','Martes','Miyerkules','Huwebes','Biyernes','Sabado','Linggo'], id:['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu']};
const FOODL = {
  'Kai lan':{zh:'芥兰',ms:'Kailan',ta:'கைலான்',tl:'Kailan',id:'Kailan'}, 'Spinach':{zh:'菠菜',ms:'Bayam',ta:'பசலைக் கீரை',tl:'Espinaka',id:'Bayam'},
  'Chicken thigh':{zh:'鸡腿肉',ms:'Peha ayam',ta:'கோழி தொடை',tl:'Hita ng manok',id:'Paha ayam'}, 'Prawns':{zh:'虾',ms:'Udang',ta:'இறால்',tl:'Hipon',id:'Udang'},
  'Cooked rice':{zh:'白饭',ms:'Nasi',ta:'சாதம்',tl:'Kanin',id:'Nasi'}, 'Bread':{zh:'面包',ms:'Roti',ta:'ரொட்டி',tl:'Tinapay',id:'Roti'},
  'Bananas':{zh:'香蕉',ms:'Pisang',ta:'வாழைப்பழம்',tl:'Saging',id:'Pisang'}, 'Tofu':{zh:'豆腐',ms:'Tauhu',ta:'டோஃபு',tl:'Tokwa',id:'Tahu'},
  'Tomatoes':{zh:'番茄',ms:'Tomato',ta:'தக்காளி',tl:'Kamatis',id:'Tomat'}, 'Milk':{zh:'牛奶',ms:'Susu',ta:'பால்',tl:'Gatas',id:'Susu'},
  'Eggs':{zh:'鸡蛋',ms:'Telur',ta:'முட்டை',tl:'Itlog',id:'Telur'}, 'Onions':{zh:'洋葱',ms:'Bawang',ta:'வெங்காயம்',tl:'Sibuyas',id:'Bawang bombay'},
  'Carrots':{zh:'红萝卜',ms:'Lobak merah',ta:'கேரட்',tl:'Karot',id:'Wortel'}, 'Yoghurt':{zh:'酸奶',ms:'Yogurt',ta:'தயிர்',tl:'Yogurt',id:'Yogurt'},
  'Apples':{zh:'苹果',ms:'Epal',ta:'ஆப்பிள்',tl:'Mansanas',id:'Apel'}, 'Leftover':{zh:'剩菜',ms:'Lebihan',ta:'மீதி உணவு',tl:'Tira',id:'Sisa'}
};
const RNAME = {zh:{r1:'芥兰炒豆腐',r2:'番茄鸡蛋炒饭',r3:'鸡肉粥',r4:'姜汁鸡肉煲仔饭',r5:'香蕉煎饼',r6:'法式吐司',r7:'菠菜蛋花汤',r8:'香蕉奶昔',r9:'参巴番茄虾',r10:'鹰嘴豆番茄咖喱',c1:'清冰箱炒饭',c2:'清冰箱煎蛋卷',c3:'清冰箱蔬菜汤'}, ms:{r1:'Kailan goreng tauhu',r2:'Nasi goreng tomato telur',r3:'Bubur ayam',r4:'Nasi ayam halia periuk tanah',r5:'Lempeng pisang',r6:'Roti telur Perancis',r7:'Sup bayam telur',r8:'Smoothie pisang susu',r9:'Udang sambal tomato',r10:'Kari kacang kuda tomato',c1:'Nasi goreng habiskan peti sejuk',c2:'Telur dadar habiskan peti sejuk',c3:'Sup sayur habiskan peti sejuk'}};
const SAFE_L = {
  zh:{'Cooked rice':'煮好的饭要在一天内吃完，只能翻热一次。如果在室温下放了超过两小时，就要丢掉。','Chicken thigh':'生鸡肉必须在“食用期限”前煮掉或冷冻。不要靠闻或尝来判断。要煮到完全没有粉红色。','Milk':'按包装上的日期，开封后几天内喝完。有酸味或结块就要丢掉。','Bread':'不新鲜的面包可以烤来吃。软面包一发霉，整条都要丢掉。','Eggs':'要煮到蛋白凝固。有裂缝或脏的蛋不要生吃，要马上煮熟。','Spinach':'蔫了的菠菜可以煮汤或炒蛋。发黏、变黑或有臭味就要丢掉。'},
  ms:{'Cooked rice':'Makan nasi dalam masa sehari selepas dimasak dan panaskan semula sekali sahaja. Jika dibiarkan pada suhu bilik lebih 2 jam, buang.','Chicken thigh':'Ayam mentah mesti dimasak atau dibekukan sebelum tarikh “guna sebelum”. Jangan hidu atau rasa untuk menilai. Masak sehingga tiada warna merah jambu.','Milk':'Ikut tarikh pada pek dan habiskan dalam beberapa hari selepas dibuka. Berbau masam atau berketul, buang.','Bread':'Roti keras sesuai dibakar. Jika roti lembut berkulat, buang seluruh roti.','Eggs':'Masak sehingga putih telur pejal. Telur retak atau kotor jangan dimakan mentah; masak segera.','Spinach':'Bayam layu masih elok untuk sup atau telur. Berlendir, gelap atau berbau, buang.'},
  ta:{'Cooked rice':'சமைத்த சாதத்தை ஒரு நாளுக்குள் சாப்பிடுங்கள், ஒருமுறை மட்டுமே சூடாக்குங்கள். அறை வெப்பநிலையில் 2 மணி நேரத்துக்கு மேல் இருந்தால், வீசிவிடுங்கள்.','Chicken thigh':'பச்சைக் கோழியை “பயன்படுத்த வேண்டிய தேதி”க்குள் சமைக்கவும் அல்லது உறைய வைக்கவும். முகர்ந்து அல்லது சுவைத்துப் பார்த்து முடிவு செய்ய வேண்டாம்.','Milk':'பாக்கெட்டில் உள்ள தேதியைப் பின்பற்றுங்கள்; திறந்த பின் சில நாட்களில் குடித்துவிடுங்கள். புளிப்பு வாசனை அல்லது கட்டிகள் இருந்தால் வீசிவிடுங்கள்.','Bread':'பழைய ரொட்டியை டோஸ்ட் செய்யலாம். மென்மையான ரொட்டியில் பூஞ்சை இருந்தால் முழு ரொட்டியையும் வீசிவிடுங்கள்.','Eggs':'வெள்ளைக்கரு கெட்டியாகும் வரை சமைக்கவும். உடைந்த அல்லது அழுக்கான முட்டைகளைப் பச்சையாகப் பயன்படுத்த வேண்டாம்.','Spinach':'வாடிய கீரையை சூப் அல்லது முட்டையில் பயன்படுத்தலாம். வழுவழுப்பாக, கருப்பாக அல்லது துர்நாற்றமாக இருந்தால் வீசிவிடுங்கள்.'}
};
const LANGS_S = [['en','English'],['zh','中文'],['ms','Melayu'],['ta','தமிழ்']];
const LANGS_H = [['en','English'],['tl','Tagalog'],['id','Indonesia']];
const lg = () => S.mode === 'helper' ? S.hlang : S.mode === 'simple' ? S.lang : 'en';
const t4 = (k, l) => { l = l || lg(); return (TXT[l] && TXT[l][k]) || TXT.en[k] || k; };
const fn = (n, l) => { l = l || lg(); if (l === 'en') return n; if (n.indexOf('Leftover: ') === 0) return FOODL.Leftover[l] + ': ' + n.slice(10); return (FOODL[n] && FOODL[n][l]) || n; };
const rn = (r, l) => { l = l || lg(); return (RNAME[l] && RNAME[l][r.id]) || r.name; };
const dl = it => { if (it.frozen) return t4('freeze_s'); if (it.days <= 0) return t4('d_today'); if (it.days === 1) return t4('d_tom'); return it.days + t4('d_days'); };
const dayN = () => (DAYS_L[lg()] || DAYS)[S.day];
const greet4 = () => { const h = new Date().getHours(); return t4(h < 12 ? 'gm' : h < 18 ? 'ga' : 'ge'); };

/* ---------- content ---------- */
const FACTS = [
  ['Rice, noodles and bread are the foods Singapore homes throw away most.', 'NEA household waste study, 2017'],
  ['Singapore produced 790,000 tonnes of food waste in 2025. Only 18% was recycled.', 'NEA food waste statistics, 2025'],
  ['About half of the food Singapore households throw away could have been avoided.', 'NEA household waste study, 2017'],
  ['Avoidable food waste is like each home binning a 2.5 kg bag of rice every week.', 'NEA household waste study, 2017'],
  ['“Best before” is about quality. “Use by” is for highly perishable food like milk: don’t eat it after the date.', 'SFA, reported in The Straits Times, Feb 2024'],
  ['Freezing pauses germs; it doesn’t kill them. Bread, cooked rice and ripe bananas freeze well.', 'USDA FSIS, Freezing and Food Safety'],
  ['Chill cooked rice within about an hour and eat it within 24 hours.', 'Food Standards Scotland, rice safety'],
  ['A fridge below 5°C keeps milk fresh up to 3 days longer than one at 7°C.', 'WRAP / Love Food Hate Waste'],
  ['People waste food when they forget what they have or where it is in the fridge.', 'Farr-Wharton, QUT fridge study'],
  ['30% of people don’t check their fridge before they shop.', 'WRAP / Love Food Hate Waste, 2019']
];
const MYTHS = [
  ['Food past its best-before date is unsafe to eat.', false, '“Best before” is about quality. Check how it looks and smells.', 'SFA, reported in The Straits Times, Feb 2024'],
  ['Food past its use-by date can be unsafe even if it looks fine.', true, '“Use by” is a safety date for highly perishable food.', 'SFA, reported in The Straits Times, Feb 2024'],
  ['Milk keeps best in the fridge door.', false, 'The door is warmer. Keep milk at the back, below 5°C.', 'Linköping University fridge study; WRAP'],
  ['Wilted vegetables have to be thrown away.', false, 'Wilted is fine cooked. Bin them if slimy, mouldy or smelly.', ''],
  ['Rice, noodles and bread are among the foods Singapore homes waste most.', true, 'They topped NEA’s household waste study.', 'NEA household waste study, 2017'],
  ['Cutting the mould off soft bread makes the rest safe.', false, 'Mould spreads through soft food. Bin the whole loaf.', 'USDA FSIS, Molds on Food'],
  ['Freezing kills all the germs in food.', false, 'Freezing only pauses germs. They wake up when food thaws.', 'USDA FSIS, Freezing and Food Safety'],
  ['Cooked rice should be chilled within about an hour.', true, 'Warm rice can grow bacteria whose toxins survive reheating.', 'Food Standards Scotland, rice safety'],
  ['Food thawed on the counter is fine to refreeze.', false, 'It can warm into the danger zone. Thaw food in the fridge.', 'USDA FSIS, The Big Thaw'],
  ['Brown bananas have gone bad.', false, 'Brown spots mean ripe and sweet: perfect for pancakes.', '']
];
const KIDFACTS = [
  ['Why do bananas go brown?', 'Brown bananas are sweeter. Perfect for pancakes!'],
  ['Why does the fridge help?', 'Cold slows the germs that make food go off.'],
  ['What does the freezer do?', 'A pause button: germs stop until food thaws.'],
  ['Why does bread go mouldy?', 'Mould loves warm, damp food and spreads further than you see!'],
  ['Where does binned food go?', 'It’s burned for power. The ash goes to Semakau Landfill.']
];
const DETECT = [
  ['d1','Find food that needs eating soon. Show a grown-up!','Fridge Finder','#1F6B45','search'],
  ['d2','Move 3 urgent foods to the front.','Front Row Hero','#C2410C','fridge'],
  ['d3','Count the eggs. Are there more or fewer than 6?','Egg Counter','#B8860B','star'],
  ['d4','Check the Eat-Me-First box. What’s inside?','Box Checker','#1D5FA8','box'],
  ['d5','Help pack tomorrow’s lunch with leftovers.','Lunch Packer','#8A5700','pot'],
  ['d6','Find a food to freeze. Ask a grown-up.','Freeze Master','#5B3B85','snow']
];
const DECOR = [['lantern','Lantern',3],['bird','Bird',4],['butterfly','Butterflies',3],['bench','Bench',5],['pond','Pond',6],['hen','Kampung hen',6]];
const FESTIVE = {
  cny: ['Chinese New Year week', 'Reunion dinner leftovers: turn the steamboat broth into noodle soup the next day.', '#C2410C'],
  raya: ['Hari Raya week', 'Open-house leftovers: rendang freezes well in small, flat portions.', '#1F6B45'],
  deepavali: ['Deepavali week', 'Extra curry keeps 2 days in the fridge; freeze spare portions the same night.', '#B8860B'],
  xmas: ['Year-end feasting', 'Roast leftovers make great fried rice and sandwiches the next day.', '#1D5FA8']
};
const FEST_ORDER = ['none', 'cny', 'raya', 'deepavali', 'xmas'];
const CUES = [['groceries','When I unpack groceries'],['home','When I get home'],['dinner','After dinner'],['time','At a set time']];
const TWISTS = ['Make it a soup', 'Under 15 minutes', 'One pan only', 'Pack it as tomorrow’s lunch', 'Breakfast for dinner', 'Make it spicy', 'No stove: blend or assemble'];
const SQUAD = [['Aqil', 6, 'Banana toast stack', '#C2410C'], ['Hui Min', 4, 'Tomato egg rice bowl', '#1D5FA8'], ['Ravi', 2, 'Spinach omelette wrap', '#5B3B85']];
const HAWKER = ['Chicken rice', 'Char kway teow', 'Nasi lemak', 'Economy rice', 'Mee goreng', 'Fried bee hoon'];
const OUT_TIPS = ['Ask for less rice if you won’t finish it.', 'Share a big plate instead of ordering two.', 'Bring a box for tabao and skip the plastic.', 'Fridge within 2 hours. Eat by tomorrow.'];
const RAJ = [['Fish fillet', 0, 'protein'], ['Spinach', 1, 'greens'], ['Bananas', 2, 'fruit'], ['Bread', 3, 'bread'], ['Milk', 4, 'dairy']];
const RCPT = [[['Bread', 1, 2.65], ['Bananas', 6, 1.8]], [['Eggs', 10, 4.95], ['Spinach', 1, 1.9]], [['Milk', 1, 3.3], ['Apples', 4, 2.6]]];
const ROLE_L = {me:'Owner', mei:'Partner', jun:'Teen, 15 · no neighbour sharing', maria:'Helper · sees her own view'};
const UNITS = [['rice', 'bowls of rice', .2, '1 bowl ≈ 200 g'], ['cr', 'plates of chicken rice', .35, '1 plate ≈ 350 g'], ['kg', 'kilograms', 1, '']];
if (!MEMBERS.some(m => m[0] === 'maria')) MEMBERS.push(['maria', 'Maria', '#5B3B85']);
TABS.kids = [['mission','Mission','star'],['detect','Detective','search'],['garden','Garden','leaf'],['badges','Stickers','heart'],['grown','Grown-ups','lock']];
TABS.teen = [['tchal','Challenge','flame'],['tsquad','Squad','users'],['tlearn','Learn','help']];
TABS.helper = [['htoday','Today','home'],['hshop','Shopping','list'],['hkitchen','Kitchen','fridge']];
function applyLang() { if (!S) return; TABS.simple[0][1] = t4('today', S.lang); TABS.simple[1][1] = t4('meals', S.lang); TABS.simple[2][1] = t4('help', S.lang); TABS.helper[0][1] = t4('today', S.hlang); TABS.helper[1][1] = t4('shop', S.hlang); TABS.helper[2][1] = t4('kitchen', S.hlang); }

/* ---------- state ---------- */
const seed3 = seed;
seed = function () {
  const s = seed3();
  Object.assign(s, {v:4, lang:'en', hlang:'tl', cue:'home', htype:'family', role:'owner', festive:'none', lifeBase:14, decor:['bird'], stickers:['d1'], mf:{score:0, n:0, round:0}, factN:0, gift:0, unit:'rice', connected:false, rcN:0, chat:[{f:'bot', t:'Hi! Forward a receipt or ask “what can I cook?”'}], out:{byo:2}, teen:{streak:3, dishes:[]}, family:[{id:'f1', name:'Ma’s braised tofu with egg', by:'Mdm Lim', ings:['Tofu','Eggs','Soy sauce'], steps:['Brown the tofu in a little oil.','Add soy sauce, a little sugar and a cup of water; simmer 10 minutes.','Add halved hard-boiled eggs and simmer until glossy.']}], carer:{lunch:true, dinner:true, note:'Take your evening medicine after dinner', added:[]}, shared:{}, reqs:[{id:++nid, name:'Onions', by:'maria', done:false}], kidFacts:2, mbDone:0});
  s.nid = nid;
  return s;
};
save = function () { S.nid = nid; try { localStorage.setItem(KEY4, JSON.stringify(S)); } catch (e) {} metrics(); };
load = function () { try { const d = JSON.parse(localStorage.getItem(KEY4) || 'null'); return d && d.v === 4 ? d : null; } catch (e) { return null; } };
const plants = () => Math.min(16, Math.floor((S.lifeBase + st().rescued) / 2));
const nextPlant = () => 2 - ((S.lifeBase + st().rescued) % 2);
const urgList = () => S.items.filter(urgent).sort((a, b) => a.days - b.days);
const basket = () => S.items.filter(i => !i.frozen && !i.listed && !i.prov && !isLeft(i) && i.cat !== 'pantry').sort((a, b) => a.days - b.days).slice(0, 3);
const bestFor = names => { const x = RECIPES.map(r => Object.assign({r:r}, resolve(r))).filter(y => !recOK(y.r, y).hide).map(y => Object.assign(y, {o:y.rows.filter(z => z.n && names.indexOf(z.n) >= 0).length})); x.sort((a, b) => (b.ok - a.ok) || (b.o - a.o) || (b.urg - a.urg)); return x[0]; };

/* ---------- facts ---------- */
function showFact(i) {
  let el = document.getElementById('fact');
  if (!el) { el = document.createElement('div'); el.id = 'fact'; el.className = 'fact'; el.setAttribute('role', 'status'); document.getElementById('app').appendChild(el); }
  const f = FACTS[i % FACTS.length];
  el.innerHTML = '<span style="color:#B8860B;flex:none">' + svg('sparkle', 18) + '</span><span class="grow"><b>Did you know?</b> ' + f[0] + (f[1] ? SRC(f[1]) : '') + '</span><button data-a="openMyth">Quiz</button>';
  el.classList.add('show'); clearTimeout(showFact.t); showFact.t = setTimeout(() => el.classList.remove('show'), 6500);
}
function maybeFact(force) { S.factN = (S.factN || 0) + 1; if (force || S.factN % 2 === 1) setTimeout(() => showFact(S.factN), 700); }

/* ---------- garden ---------- */
function gardenSVG(h, onDark) {
  const n = plants(), d = S.decor || [];
  const cols = ['#E8642C', '#F2B632', '#C2410C', '#6FA3DB'];
  let p = '';
  for (let i = 0; i < n; i++) {
    const x = 18 + (i % 8) * 23, y = i < 8 ? 96 : 110, k = i % 4, c = cols[i % 4];
    p += '<g class="pl" style="--d:' + i + '">';
    if (k === 0) p += '<path d="M' + x + ' ' + y + 'v-16" stroke="#2E7A4F" stroke-width="2.4"/><ellipse cx="' + (x - 5) + '" cy="' + (y - 11) + '" rx="5" ry="2.6" fill="#3F8F5E"/><ellipse cx="' + (x + 5) + '" cy="' + (y - 15) + '" rx="5" ry="2.6" fill="#3F8F5E"/>';
    else if (k === 1) p += '<path d="M' + x + ' ' + y + 'v-20" stroke="#2E7A4F" stroke-width="2.2"/><circle cx="' + x + '" cy="' + (y - 22) + '" r="5.5" fill="' + c + '"/><circle cx="' + x + '" cy="' + (y - 22) + '" r="2" fill="#FFF6E0"/>';
    else if (k === 2) p += '<ellipse cx="' + x + '" cy="' + (y - 9) + '" rx="9" ry="9" fill="#3F8F5E"/><circle cx="' + (x - 3) + '" cy="' + (y - 11) + '" r="2" fill="#C2410C"/><circle cx="' + (x + 4) + '" cy="' + (y - 7) + '" r="2" fill="#C2410C"/>';
    else p += '<path d="M' + (x - 4) + ' ' + y + 'l2 -24M' + x + ' ' + y + 'l0 -28M' + (x + 4) + ' ' + y + 'l-2 -24" stroke="#2E7A4F" stroke-width="2.6" stroke-linecap="round"/>';
    p += '</g>';
  }
  let dec = '';
  if (d.indexOf('lantern') >= 0) dec += '<path d="M30 0v16" stroke="#8A5700" stroke-width="1.5"/><ellipse cx="30" cy="24" rx="8" ry="9" fill="#C2410C"/><rect x="26" y="32" width="8" height="3" fill="#F2B632"/>';
  if (d.indexOf('bird') >= 0) dec += '<g class="bob"><path d="M150 30c6-6 14-6 18 0-6-2-12 0-18 0z" fill="#1D5FA8"/><circle cx="167" cy="27" r="1.6" fill="#18201A"/></g>';
  if (d.indexOf('butterfly') >= 0) dec += '<g class="flut"><g fill="#F2B632"><ellipse cx="96" cy="44" rx="4" ry="6" transform="rotate(-30 96 44)"/><ellipse cx="104" cy="44" rx="4" ry="6" transform="rotate(30 104 44)"/></g><g fill="#E8642C"><ellipse cx="124" cy="56" rx="3" ry="5" transform="rotate(-30 124 56)"/><ellipse cx="130" cy="56" rx="3" ry="5" transform="rotate(30 130 56)"/></g></g>';
  if (d.indexOf('bench') >= 0) dec += '<rect x="76" y="70" width="36" height="5" rx="2" fill="#8A5700"/><rect x="80" y="75" width="3" height="9" fill="#8A5700"/><rect x="105" y="75" width="3" height="9" fill="#8A5700"/>';
  if (d.indexOf('pond') >= 0) dec += '<ellipse cx="170" cy="76" rx="20" ry="7" fill="#6FA3DB"/>';
  if (d.indexOf('hen') >= 0) dec += '<ellipse cx="44" cy="74" rx="9" ry="7" fill="#C98A3A"/><circle cx="51" cy="67" r="4.5" fill="#C98A3A"/><path d="M50 62l2-3 2 3" fill="#C2410C"/><path d="M55 68l3 1-3 1z" fill="#F2B632"/>';
  return '<svg viewBox="0 0 200 120" width="100%" height="' + h + '" preserveAspectRatio="xMidYMax meet" aria-hidden="true">' + (onDark ? '' : '<rect width="200" height="120" rx="12" fill="#E8F3E8"/>') + '<path d="M0 88h200v32H0z" fill="#8BBF7A"/><path d="M0 98h200v22H0z" fill="#7A5A35" opacity=".55"/>' + dec + p + '</svg>';
}
function gardenPanel(kid) {
  let h = '<div style="border-radius:22px;overflow:hidden;background:#E8F3E8">' + gardenSVG(190) + '</div>';
  h += '<p style="margin:0;font-size:15px"><b>' + plants() + ' plants</b> grown from ' + (S.lifeBase + st().rescued) + ' rescues. ' + (plants() < 16 ? nextPlant() + ' more rescue' + (nextPlant() > 1 ? 's' : '') + ' grows the next one.' : 'Your garden is full!') + '</p>';
  h += '<p class="sub">Grows with every rescue at home.</p>';
  h += '<div class="between"><h2 class="h2">Decorate</h2><span class="pill p-amb">' + svg('star', 13, 2.2) + S.kids.stars + ' stars</span></div><div class="g3">' + DECOR.map(x => { const own = S.decor.indexOf(x[0]) >= 0; return '<button class="card col" style="gap:4px;padding:10px;align-items:center;text-align:center;' + (own ? 'background:#E9F2EC;border-color:#B9D6C3' : '') + '" data-a="buyDecor" data-v="' + x[0] + '"><b style="font-size:14px">' + x[1] + '</b><span class="sub">' + (own ? 'In your garden' : x[2] + ' stars') + '</span></button>'; }).join('') + '</div>';
  h += '<p class="sub">' + (kid ? 'Earn stars from missions and jobs.' : 'Earn stars from kids’ missions and quizzes.') + '</p>';
  return h;
}

/* ---------- myth or fact ---------- */
function mfHTML() {
  U.mf = U.mf || {i:0, ans:null, score:0};
  const M = U.mf, start = (S.mf.round * 5) % MYTHS.length;
  if (M.i >= 5) return '<div class="mf"><span class="fi" style="width:64px;height:64px;border-radius:32px;background:#F2B632;color:#fff;margin:0 auto">' + svg('star', 34) + '</span><b style="font-size:24px">' + M.score + ' of 5 right</b><p class="sub" style="font-size:15px">You earned ' + M.score + ' star' + (M.score === 1 ? '' : 's') + ' for the kitchen garden.</p><button class="btn pri" data-a="mfAgain">Play 5 more</button></div>';
  const q = MYTHS[(start + M.i) % MYTHS.length];
  let h = '<div class="dots">' + [0,1,2,3,4].map(i => '<i class="' + (i <= M.i ? 'on' : '') + '"></i>').join('') + '</div><div class="mf"><span class="sub" style="font-weight:800;color:#1F6B45">MYTH OR FACT?</span><b style="font-size:21px;line-height:1.3">' + q[0] + '</b>';
  if (M.ans === null) h += '</div><div class="g2"><button class="btn" style="min-height:60px;background:#FDE7DC;color:#B13C0B;font-size:18px" data-a="mfAns" data-v="myth">Myth</button><button class="btn" style="min-height:60px;background:#E9F2EC;color:#1F6B45;font-size:18px" data-a="mfAns" data-v="fact">Fact</button></div>';
  else { const right = (M.ans === 'fact') === q[1]; h += '<span class="pill ' + (right ? 'p-grn' : 'p-red') + '" style="align-self:center;font-size:14px">' + (right ? 'Right! ' : 'Not quite. ') + 'It’s a ' + (q[1] ? 'fact' : 'myth') + '</span><p style="margin:0;font-size:15px;color:#3D453F">' + q[2] + '</p>' + (q[3] ? SRC(q[3]) : '') + '</div><button class="btn pri full" data-a="mfNext">' + (M.i === 4 ? 'See my score' : 'Next card') + '</button>'; }
  return h;
}

/* ---------- Today (standard) ---------- */
function hero4() {
  const t = st(), lvl = Math.floor(S.xp / 100) + 1, xin = S.xp % 100;
  const big = {money:[money(t.saved), 'saved this week'], waste:[t.beforeExp + ' items', 'used before they expired'], neighbours:[(t.shared + t.donated) + ' items', 'shared or donated'], cook:[S.meals + (S.meals === 1 ? ' meal' : ' meals'), 'cooked from what you had']}[S.why];
  let h = '<div class="hero" style="padding:14px 16px;gap:8px"><div class="row" style="align-items:stretch;gap:12px"><div class="grow col" style="gap:3px"><span class="lt" style="font-size:13px;font-weight:700">' + WHY.find(w => w[0] === S.why)[1] + '</span><b style="font-size:30px;line-height:1.05">' + big[0] + '</b><span class="lt" style="font-size:13px">' + big[1] + '</span><span class="row" style="gap:6px;font-size:13px;font-weight:800;margin-top:4px"><span style="color:#F2B632">' + svg('flame', 16) + '</span>' + S.streak + '-day rescue streak</span></div>';
  h += '<button data-a="openGarden" aria-label="Open the kitchen garden" style="border:0;padding:6px 4px 4px;background:rgba(255,255,255,.12);border-radius:16px;width:118px;flex:none;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:2px;color:#fff">' + gardenSVG(64, true) + '<span style="font-size:13px;font-weight:700">' + plants() + ' plants</span></button></div>';
  if (S.game) h += '<div class="row" style="gap:10px;font-size:13px"><b style="white-space:nowrap">Lv ' + lvl + '</b><div class="bar grow" style="height:8px"><i style="width:' + xin + '%"></i></div><span class="lt" style="white-space:nowrap">' + xin + '/100 XP</span></div>';
  return h + '</div>';
}
function shelf4(urg) {
  return '<div class="col" style="gap:10px"><div class="between"><h2 class="h2">Eat-Me-First shelf</h2><span class="pill p-red">' + urg.length + ' items</span></div>' +
    (urg.length ? '<div class="shelf">' + urg.map(it => { const d = dinfo(it), c = iinfo(it); return '<div class="card" style="width:176px;padding:12px;display:flex;flex-direction:column;gap:8px"><button style="border:0;background:none;padding:0;display:flex;gap:10px;align-items:center;text-align:left" data-a="item" data-v="' + it.id + '">' + icoI(it, 40) + '<span><b style="display:block;font-size:14px;line-height:1.2">' + esc(it.name) + '</b><span class="sub">' + qtyL(it) + '</span></span></button><span class="row" style="gap:4px;flex-wrap:wrap"><span class="pill ' + d.c + '">' + d.l + '</span>' + (c.risk === 'high' ? '<span class="pill p-red" title="High-risk food">' + svg('alert', 13, 2.4) + '</span>' : '') + '</span><div class="g2" style="gap:6px"><button class="act" style="background:#1F6B45;color:#fff;font-size:13px" data-a="act" data-v="use:' + it.id + '">' + (isLeft(it) ? 'Ate it' : 'Use') + '</button><button class="act a-frz" style="font-size:13px" data-a="act" data-v="freeze:' + it.id + '">Freeze</button>' + (c.share && S.role !== 'teen' ? '<button class="act a-shr" style="font-size:13px" data-a="act" data-v="share:' + it.id + '">Share</button>' : '<button class="act" style="background:#FFF8E6;color:#5C3A00;font-size:13px" data-a="safeOpen" data-v="' + it.id + '">Safe?</button>') + '<button class="act a-bin" style="font-size:13px" data-a="act" data-v="bin:' + it.id + '">Bin</button></div></div>'; }).join('') + '</div>' : '<div class="card sub" style="border-style:dashed">Nothing urgent right now. Nice work.</div>') + '</div>';
}
function outCard() {
  return '<div class="card col" style="gap:10px"><div class="between"><h2 class="h2">Eating out today?</h2><span class="pill p-grn">BYO box ' + S.out.byo + '</span></div><div class="g3"><button class="btn ghost" style="min-height:52px;font-size:13px;padding:0 6px" data-a="tabao">' + svg('bag', 16) + 'Tabao leftovers</button><button class="btn ghost" style="min-height:52px;font-size:13px;padding:0 6px" data-a="orderLess">Ordered less</button><button class="btn ghost" style="min-height:52px;font-size:13px;padding:0 6px" data-a="byo">Brought a box</button></div><p class="sub">Tip: ' + OUT_TIPS[(S.day + S.out.byo) % OUT_TIPS.length] + '</p></div>';
}
function festBanner() {
  const f = FESTIVE[S.festive]; if (!f) return '';
  const n = S.log.filter(e => e.t === 'used' && e.name.indexOf('Leftover') === 0).length;
  return '<div class="card col acc-a" style="gap:6px;border-left:5px solid ' + f[2] + '"><div class="between"><b style="font-size:16px;color:' + f[2] + '">' + f[0] + '</b><span class="pill p-amb">' + Math.min(3, n) + '/3 leftovers</span></div><span style="font-size:14px">' + f[1] + '</span><span class="sub">Festive quest: eat 3 saved leftovers this week for +60 XP.</span></div>';
}
function moreHTML() {
  const g = S.game, n = Object.values(S.check).filter(Boolean).length, lefts = S.items.filter(i => isLeft(i) && !i.frozen), prov = S.items.filter(i => i.prov), estU = urgList().filter(i => i.est && !i.prov);
  let h = '';
  if (prov.length || estU.length) h += '<button class="card" style="display:flex;gap:12px;align-items:center;text-align:left;background:#FFF8E6;border-color:#F0E0B4" data-a="openConfirm"><span class="fi" style="width:40px;height:40px;background:#F2B632;color:#fff">' + svg('help', 20) + '</span><span class="grow"><b style="display:block">' + (prov.length + estU.length) + ' quick checks</b><span class="sub" style="color:#5C3A00">Confirm rough guesses</span></span></button>';
  if (lefts.length) h += '<button class="card" style="display:flex;gap:12px;align-items:center;text-align:left" data-a="goLeft"><span class="fi" style="width:40px;height:40px;background:#E9F2EC;color:#1F6B45">' + svg('box', 20) + '</span><span class="grow"><b style="display:block">' + lefts.length + ' leftover' + (lefts.length > 1 ? 's' : '') + ' in the Hub</b><span class="sub">' + esc(lefts.map(l => l.name.replace('Leftover: ', '')).join(', ')) + '</span></span></button>';
  h += '<div class="card col" style="gap:12px"><div class="between"><h2 class="h2">30-second fridge check</h2><b style="color:#1F6B45;font-size:14px">' + n + '/4</b></div><div class="g2">' + CHECKS.map(c => '<button class="check" data-a="check" data-v="' + c[0] + '" aria-pressed="' + S.check[c[0]] + '"><span class="ring">' + (S.check[c[0]] ? svg('check', 13, 3.4) : '') + '</span><span><b style="display:block;font-size:13px;line-height:1.2">' + c[1] + '</b><span style="font-size:13px;color:#4F5851">' + (S.check[c[0]] ? 'Done' : c[2]) + '</span></span></button>').join('') + '</div>' + SRC('Search, move, use, finish: Seta et al., 2025, 126 households in Japan') + '</div>';
  if (g) h += '<div class="card col" style="gap:10px"><h2 class="h2">This week’s quests</h2>' + quests().map(q => { const done = S.claimed[q[0]], c = Math.min(q[2], q[3]); return '<div class="col" style="gap:6px"><div class="between"><span style="font-size:14px;font-weight:600">' + q[1] + '</span><span style="font-size:13px;font-weight:800;color:' + (done ? '#1F6B45' : '#7A4D00') + '">' + (done ? 'Claimed' : q[0] === 'fest' ? '+60 XP' : '+50 XP') + '</span></div><div class="bar" style="height:8px"><i style="width:' + Math.round(c / q[3] * 100) + '%"></i></div></div>'; }).join('') + '</div>';
  h += '<h2 class="h2">Tools</h2><div class="g2">' + [['openChat','chat','Chat helper','In your family group'],['openSnap','cam','Fridge snap','Fix the list in 10 s'],['openLearn','book','Learn & donate','Flashcards and games'],['openKit','magnet','Fridge kit','Label, tape, magnet'],['openLock','phone','Lock screen','Eat today widget'],['openConnect','receipt','Receipts', S.connected ? 'Importing automatically' : 'Connect a supermarket']].map(x => '<button class="card col" style="gap:6px;padding:12px;text-align:left" data-a="' + x[0] + '"><span class="fi" style="width:36px;height:36px;background:#E9F2EC;color:#1F6B45">' + svg(x[1], 18) + '</span><b style="font-size:14px">' + x[2] + '</b><span class="sub">' + x[3] + '</span></button>').join('') + '</div>';
  const req = S.listings.filter(l => l.status === 'requested').length;
  h += '<button class="card" style="display:flex;gap:12px;align-items:center;text-align:left" data-a="tab" data-v="share"><span class="fi" style="width:40px;height:40px;background:#E9F2EC;color:#1F6B45">' + svg('users', 20) + '</span><span class="grow"><b style="display:block">' + (req ? req + ' pickup request' + (req > 1 ? 's' : '') + ' waiting' : 'Share and donate') + '</b><span class="sub">Neighbours and food charities</span></span></button>';
  h += '<div class="g2"><button class="btn ghost" style="border-style:dashed" data-a="nextDay">' + svg('clock', 18) + 'Skip to tomorrow</button><button class="btn ghost" style="border-style:dashed" data-a="remindNow">' + svg('bell', 18) + 'Reminder</button></div><p class="sub" style="text-align:center">Demo controls.</p>';
  return h;
}
todayHTML = function () {
  const urg = urgList();
  let h = head(greet(), DAYS[S.day] + ' · ' + MEMBERS.length + ' at home', '<span class="row" style="gap:8px">' + iconBtn('openLock', 'phone', 'Lock-screen widget preview') + iconBtn('settings', 'gear', 'Settings') + '</span>');
  if (S.festive !== 'none') h += festBanner();
  h += hero4() + tonightHTML() + shelf4(urg) + outCard();
  h += '<button class="more-btn" data-a="toggleMore" aria-expanded="' + !!U.more + '">' + svg(U.more ? 'back' : 'plus', 18, 2.2).replace('M15 5l-7 7 7 7', 'M5 15l7-7 7 7') + (U.more ? 'Show less' : 'More: habits, quests, leftovers, tools') + '</button>';
  if (U.more) h += moreHTML();
  return '<div class="col">' + h + '</div>';
};
const quests3 = quests;
quests = function () { const q = quests3(); if (S.festive && S.festive !== 'none') q.push(['fest', 'Eat 3 saved leftovers (festive)', S.log.filter(e => e.t === 'used' && e.name.indexOf('Leftover') === 0).length, 3]); return q; };

/* ---------- pushes ---------- */
function lockHTML() {
  const d = new Date(), urg = urgList().slice(0, 3), b = bestFor(urgList().map(i => i.name));
  const cue = {groceries:['Unpacking groceries?', 'Put older food at the front first.'], home:['Welcome home', 'A few things need using tonight.'], dinner:['After dinner', 'Any leftovers to log?'], time:['Use it or lose it', 'Your daily reminder at ' + S.rem + '.']}[S.cue];
  let h = '<div class="lock"><div style="text-align:center;margin:6px 0 18px"><div style="font-size:17px;font-weight:600">' + DAYS[S.day] + '</div><div style="font-size:76px;font-weight:300;line-height:1;letter-spacing:-.02em">' + d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0') + '</div></div>';
  h += '<div class="wid col" style="gap:10px"><div class="between"><span class="row" style="gap:8px;font-weight:800">' + logo(22, true) + 'Eat today</span><span class="sub">' + urgList().length + ' items</span></div>';
  h += urg.length ? urg.map(it => '<div class="row">' + icoI(it, 34) + '<span class="grow"><b style="display:block;font-size:14px">' + esc(it.name) + '</b><span class="sub">' + dinfo(it).l + '</span></span><button class="btn pri sm" style="min-height:40px" data-a="act" data-v="use:' + it.id + '">Used</button></div>').join('') : '<span class="sub">Nothing urgent. Nice work.</span>';
  if (b && b.ok) h += '<button class="btn sec full" style="min-height:44px" data-a="lockCook" data-v="' + b.r.id + '">' + svg('pot', 18) + 'Cook: ' + b.r.name + '</button>';
  h += '</div><div class="g2" style="margin-top:10px"><div class="wid col" style="gap:4px;align-items:center;padding:10px">' + gardenSVG(60) + '<b style="font-size:13px">' + plants() + ' plants</b></div><div class="wid col" style="gap:2px;align-items:center;justify-content:center;padding:10px"><span style="color:#E8642C">' + svg('flame', 28) + '</span><b style="font-size:22px">' + S.streak + '</b><span class="sub">day streak</span></div></div>';
  h += '<div class="wid row" style="margin-top:10px;align-items:flex-start;gap:10px;padding:12px"><span class="applogo" style="width:32px;height:32px">' + logo(20, true) + '</span><span class="grow"><span class="between sub"><b style="color:#18201A">Jiak Clean</b><span>now</span></span><b style="display:block;font-size:14px">' + cue[0] + '</b><span class="sub">' + cue[1] + '</span></span></div>';
  h += '<button class="btn" style="margin:20px auto 0;display:flex;background:rgba(255,255,255,.16);color:#fff" data-a="back">Swipe up to open Jiak Clean</button><p style="text-align:center;font-size:13px;color:#A9B7AD;margin:10px 0 0">Lock-screen preview. Buttons work.</p></div>';
  return h;
}
function chatHTML() {
  const msgs = S.chat.map(m => '<div class="bub ' + (m.f === 'me' ? 'me' : 'bot') + '">' + (m.f === 'bot' ? '<b style="display:block;font-size:13px;color:#1F6B45">Jiak Clean helper</b>' : m.f === 'mei' ? '<b style="display:block;font-size:13px;color:#C2410C">Mei</b>' : '') + esc(m.t) + '</div>').join('');
  return '<div class="chat"><div class="row" style="padding:6px 12px;background:#F6F7F2;border-bottom:1px solid #E3E6DE"><button class="btn ghost ib" data-a="back" aria-label="Back">' + svg('back', 22, 2.2) + '</button><span class="applogo" style="width:36px;height:36px">' + logo(24, true) + '</span><span class="grow"><b style="display:block;font-size:15px">Family chat</b><span class="sub">You, Mei, Jun, Maria and Jiak Clean helper</span></span></div><div class="msgs" id="msgs">' + msgs + '</div><div style="display:flex;gap:6px;overflow-x:auto;padding:8px 10px 0;background:#F6F7F2;scrollbar-width:none">' + [['receipt','Forward a receipt'],['cook','What can I cook?'],['list','Show our list'],['add milk','Add milk'],['summary','Weekly summary']].map(c => '<button class="chip" style="flex:none" data-a="chatSend" data-v="' + c[0] + '">' + c[1] + '</button>').join('') + '</div><div class="bar2"><label for="chatin" style="position:absolute;left:-9999px">Message</label><input id="chatin" class="input" placeholder="Message, e.g. used tofu" value="' + esc(U.chatText || '') + '" data-in="chatText" data-enter="chatSend"><button class="btn pri ib" data-a="chatSend" aria-label="Send">' + svg('next', 20, 2.4) + '</button></div><p class="sub" style="text-align:center;padding:0 0 8px;background:#F6F7F2">Demo of a chat-app helper. Nothing is sent.</p></div>';
}
function carerHTML() {
  const C = S.carer, its = RAJ.concat(C.added.map(n => [n, info(n).days, info(n).cat]));
  let h = backBar('Anita’s view') + '<div class="card row" style="background:#E9F2EC;border-color:#CFE0D4"><span class="av" style="width:44px;height:44px;background:#5B3B85;font-size:16px">R</span><span class="grow"><b style="display:block">Dad’s kitchen · Mr Raj, 78</b><span class="sub">Shared with his OK. He can stop anytime.</span></span></div>';
  h += '<div class="warn">' + svg('alert', 18) + '<span>Fish fillet due today, not used yet. Last active 2 h ago.</span></div>';
  h += '<div class="list">' + its.map(x => '<div class="li" style="cursor:default">' + ico(x[0], 40) + '<span class="grow t">' + x[0] + '</span><span class="pill ' + (x[1] <= 0 ? 'p-red' : x[1] <= 2 ? 'p-amb' : 'p-grn') + '">' + (x[1] <= 0 ? 'Use today' : x[1] === 1 ? 'Tomorrow' : x[1] + ' days') + '</span></div>').join('') + '</div>';
  h += '<b>Add to Dad’s kitchen</b><div class="wrap">' + ['Eggs','Bread','Bananas','Apples','Milk'].map(n => '<button class="chip" data-a="carerAdd" data-v="' + n + '">+ ' + n + '</button>').join('') + '</div>';
  h += '<b>Mealtime reminders (spoken on his phone)</b><div class="list">' + [['lunch','Lunch at 12 pm'],['dinner','Dinner at 6 pm']].map(r => '<button class="li" data-a="carerTog" data-v="' + r[0] + '" aria-pressed="' + C[r[0]] + '">' + tog(C[r[0]]) + '<span class="grow t">' + r[1] + '</span></button>').join('') + '</div>';
  h += '<label for="carernote"><b>Reminder text, written by family</b></label><input id="carernote" class="input" value="' + esc(U.carerNote != null ? U.carerNote : C.note) + '" data-in="carerNote"><button class="btn ghost" data-a="carerSave">Save reminder text</button><p class="sub">Read aloud at dinner. Not medical advice.</p>';
  h += '<div class="card col" style="gap:6px"><b>Sunday restock list</b><span class="sub">Fish or tofu ×2, greens, half a loaf, 1 L milk.</span></div>';
  return '<div class="scroll"><div class="col">' + h + '</div></div>';
}
function teenRunHTML() {
  const T = U.tc; if (!T) return '';
  const its = T.ids.map(find).filter(Boolean);
  let h = backBar('15-minute challenge');
  if (T.phase === 'cook') h += '<div class="card col" style="align-items:center;gap:8px;padding:22px"><span class="timer" id="tctimer">' + fmtT(T.left) + '</span><span class="sub">Demo: the clock runs 30× faster</span></div><b>Use all three</b><div class="wrap">' + its.map(i => '<span class="pill p-red" style="font-size:14px;padding:6px 12px">' + esc(i.name) + '</span>').join('') + '</div><div class="card col" style="gap:6px"><b>Ideas</b><span style="font-size:14px">Base: rice, bread or noodles. Add your three items. Finish with a sauce and something crunchy. Cook meat and eggs all the way through.</span></div><button class="btn pri full" data-a="tDone">Done! Snap my dish</button>';
  else h += '<div style="border-radius:22px;overflow:hidden">' + '<svg viewBox="0 0 300 180" width="100%" aria-hidden="true"><rect width="300" height="180" fill="#2B3A30"/><ellipse cx="150" cy="96" rx="104" ry="62" fill="#fff"/><ellipse cx="150" cy="92" rx="80" ry="44" fill="#F4EEDD"/><circle cx="120" cy="86" r="12" fill="#E8642C"/><circle cx="150" cy="98" r="10" fill="#3F8F5E"/><circle cx="178" cy="84" r="13" fill="#F2B632"/><circle cx="140" cy="76" r="6" fill="#3F8F5E"/></svg></div><b>Name your dish</b>' + chips(['Rescue rice bowl','Toast stack','Wrap it up','Soup bowl'], T.dish || '', 'tDish') + '<button class="btn pri full" data-a="tPost"' + (T.dish ? '' : ' style="opacity:.55"') + '>Post to my squad</button><p class="sub">Only the 3 friends in your squad see it.</p>';
  return '<div class="scroll"><div class="col">' + h + '</div></div>';
}
const push3 = pushHTML;
pushHTML = function (p) { return p.t === 'lock' ? lockHTML() : p.t === 'chat' ? chatHTML() : p.t === 'carer' ? carerHTML() : p.t === 'tchal' ? teenRunHTML() : push3(p); };

/* ---------- kids ---------- */
function kidsDetectHTML() {
  return '<div class="col">' + head('Fridge detective', S.stickers.length + ' of ' + DETECT.length + ' stickers') + DETECT.map(d => { const done = S.stickers.indexOf(d[0]) >= 0; return '<div class="card col" style="border:2px solid ' + (done ? '#B9D6C3' : '#E8DDBF') + ';gap:10px"><div class="row" style="align-items:flex-start"><span class="fi" style="width:48px;height:48px;border-radius:24px;background:' + (done ? d[3] : '#F1EAD4') + ';color:' + (done ? '#fff' : '#9A8E6A') + '">' + svg(d[4], 24) + '</span><span class="grow" style="font-size:17px;font-weight:700;line-height:1.35">' + d[1] + '</span></div>' + (done ? '<span class="pill p-grn" style="align-self:flex-start;font-size:14px">' + svg('check', 14, 3) + 'Sticker: ' + d[2] + '</span>' : '<button class="btn pri" style="min-height:52px;font-size:17px" data-a="detDone" data-v="' + d[0] + '">I did it!</button>') + '</div>'; }).join('') + '<p class="sub" style="text-align:center;color:#4A3F22">Each job: 1 sticker + 1 star.</p></div>';
}
function kidsGardenHTML() { return '<div class="col">' + head('Our garden', 'The whole family grows it') + gardenPanel(true) + '</div>'; }
function kidsStickersHTML() {
  let h = head('Stickers & stories', S.kids.stars + ' stars to spend in the garden');
  h += '<div class="g3">' + DETECT.map(d => { const e = S.stickers.indexOf(d[0]) >= 0; return '<div class="sticker" style="background:' + (e ? d[3] : '#F1EAD4') + ';color:' + (e ? '#fff' : '#9A8E6A') + '">' + svg(e ? d[4] : 'lock', 30) + d[2] + '</div>'; }).join('') + '</div>';
  h += '<h2 class="h2">Badges</h2><div class="g3" style="row-gap:16px">' + KBADGES.map((b, i) => { const e = i < S.kids.earned; return '<span class="badge" style="font-size:13px"><span style="width:60px;height:60px;border-radius:30px;background:' + (e ? b[1] : '#F1EAD4') + ';color:' + (e ? '#fff' : '#9A8E6A') + '">' + svg(e ? 'star' : 'lock', 28) + '</span>' + b[0] + '</span>'; }).join('') + '</div>';
  h += '<h2 class="h2">Why food goes off</h2>' + KIDFACTS.map((f, i) => i < (S.kidFacts || 0) ? '<div class="card col" style="gap:4px;border:2px solid #E8DDBF"><b style="font-size:16px">' + f[0] + '</b><span style="font-size:15px">' + f[1] + '</span></div>' : '<div class="card row sub" style="border:2px dashed #E8DDBF">' + svg('lock', 18) + 'Finish a mission to unlock: ' + f[0] + '</div>').join('');
  return '<div class="col">' + h + '</div>';
}
const kidMission3 = kidMissionHTML;
kidMissionHTML = function () {
  const html = kidMission3(), M = U.sd.m;
  if (!M || M.step < M.steps.length) return html;
  const f = KIDFACTS[Math.max(0, Math.min(KIDFACTS.length, S.kidFacts || 1) - 1)];
  return html.replace('<button class="btn pri full" style="min-height:64px;font-size:20px;border-radius:22px" data-a="back">', '<div class="card col" style="gap:4px;border:2px solid #E8DDBF;text-align:left;width:100%"><b style="color:#1F6B45">New story unlocked: ' + f[0] + '</b><span style="font-size:15px">' + f[1] + '</span></div><button class="btn pri full" style="min-height:64px;font-size:20px;border-radius:22px" data-a="back">');
};

/* ---------- teen ---------- */
const teenItems = () => S.items.filter(i => !i.frozen && !i.listed && !i.prov && i.cat !== 'pantry').sort((a, b) => a.days - b.days).slice(0, 3);
function teenChalHTML() {
  const its = teenItems();
  let h = head('15-minute challenge', 'Jun · Sec 3');
  h += '<div class="hero"><div class="between"><span class="row" style="gap:8px;font-weight:800;font-size:18px"><span style="color:#E8642C">' + svg('flame', 24) + '</span>' + S.teen.streak + '-day squad streak</span><span class="lt">4 in squad</span></div><span class="lt" style="font-size:14px">Cook 3 rescue foods. Post it to keep the streak.</span></div>';
  h += '<div class="card col" style="gap:10px"><b>Today’s three</b><div class="list">' + its.map(i => '<div class="li" style="cursor:default">' + icoI(i, 36) + '<span class="grow t">' + esc(i.name) + '</span><span class="pill ' + dinfo(i).c + '">' + dinfo(i).l + '</span></div>').join('') + '</div><button class="btn pri full" style="min-height:56px;font-size:17px" data-a="tStart">' + svg('clock', 20) + 'Start the 15 minutes</button><span class="sub">Get a grown-up for knives and the stove.</span></div>';
  if (S.teen.dishes.length) h += '<h2 class="h2">Your dishes</h2>' + S.teen.dishes.slice(0, 3).map(d => '<div class="card row"><span class="fi" style="width:40px;height:40px;background:#FCEDE4;color:#C2410C">' + svg('pot', 20) + '</span><span class="grow"><b style="display:block">' + esc(d.name) + '</b><span class="sub">' + esc(d.items.join(', ')) + '</span></span></div>').join('');
  h += '<p class="sub row" style="gap:8px;align-items:flex-start">' + svg('lock', 16) + '<span>Friends only. No strangers, no public profile.</span></p>';
  return '<div class="col">' + h + '</div>';
}
function teenSquadHTML() {
  let h = head('Your squad', 'Invite-only');
  h += '<div class="list">' + [['You', S.teen.streak, S.teen.dishes[0] ? S.teen.dishes[0].name : 'Nothing yet today', '#1F6B45']].concat(SQUAD).map(f => '<div class="li" style="cursor:default"><span class="av" style="width:40px;height:40px;background:' + f[3] + ';font-size:15px">' + f[0][0] + '</span><span class="grow"><b style="display:block">' + f[0] + '</b><span class="sub">Latest: ' + esc(f[2]) + '</span></span><span class="row" style="gap:4px;font-weight:800;color:#C2410C">' + svg('flame', 16) + f[1] + '</span></div>').join('') + '</div>';
  h += '<div class="card col" style="gap:6px"><b>Invite a friend</b><span style="font-size:22px;font-weight:800;letter-spacing:.08em">PS-4821</span><span class="sub">Share with friends. No public search.</span></div>';
  h += '<div class="card col" style="gap:8px"><div class="between"><b>Class 3E team</b><span class="pill p-grn">41 rescues this term</span></div><div class="bar"><i style="width:68%"></i></div><span class="sub">Teams, not individuals. Sample data.</span></div>';
  return '<div class="col">' + h + '</div>';
}
function teenLearnHTML() { return '<div class="col">' + head('Learn', 'Myth or fact') + mfHTML() + '</div>'; }

/* ---------- helper ---------- */
function helperTodayHTML() {
  const urg = urgList(), T = S.tonight, lefts = S.items.filter(i => isLeft(i) && !i.frozen);
  let h = head(t4('h_title'), dayN() + ' · ' + t4('h_sub'));
  h += '<div class="wrap">' + LANGS_H.map(l => '<button class="chip" data-a="setHlang" data-v="' + l[0] + '" aria-pressed="' + (S.hlang === l[0]) + '">' + svg('globe', 14) + l[1] + '</button>').join('') + '</div>';
  h += '<div class="card col" style="gap:8px"><h2 class="h2">' + t4('h_tonight') + '</h2>' + (T.pick ? '<b style="font-size:17px">' + R(T.pick).name + '</b><span class="sub">' + (T.cook === 'maria' ? t4('h_cooking') : T.cook ? mem(T.cook)[1] : t4('h_notcook')) + '</span><button class="btn sec" style="min-height:44px" data-a="recipe" data-v="' + T.pick + '">' + t4('h_open') + '</button>' : '<span class="sub">' + t4('h_notcook') + '</span>') + '</div>';
  h += '<h2 class="h2">' + t4('h_urgent') + '</h2>' + (urg.length ? '<div class="list">' + urg.map(it => '<div class="li" style="cursor:default;flex-wrap:wrap">' + icoI(it, 40) + '<span class="grow"><span class="t" style="display:block">' + esc(fn(it.name)) + '</span><span class="s">' + dl(it) + '</span></span><button class="btn pri sm" style="min-height:44px" data-a="act" data-v="use:' + it.id + '">' + t4('used_s') + '</button><button class="btn ghost sm" style="min-height:44px" data-a="act" data-v="freeze:' + it.id + '">' + t4('freeze_s') + '</button></div>').join('') + '</div>' : '<div class="card sub">' + t4('nothing') + '</div>');
  if (lefts.length) h += '<h2 class="h2">' + t4('h_left') + '</h2><div class="list">' + lefts.map(it => '<div class="li" style="cursor:default">' + icoI(it, 36) + '<span class="grow t">' + esc(fn(it.name)) + '</span><span class="pill ' + dinfo(it).c + '">' + dl(it) + '</span></div>').join('') + '</div>';
  h += '<div class="note">' + svg('shield', 18) + '<span>' + t4('h_privacy') + '</span></div>';
  return '<div class="col">' + h + '</div>';
}
function helperShopHTML() {
  let h = head(t4('h_list'), dayN());
  h += '<div class="list">' + S.shop.map(s => '<div class="li" style="cursor:default;flex-wrap:wrap">' + ico(s.name, 36) + '<span class="grow"><span class="t" style="display:block">' + esc(fn(s.name)) + '</span><span class="s">' + (s.claim === 'maria' ? t4('h_getting') : s.claim ? mem(s.claim)[1] : '') + '</span></span>' + (s.claim ? '' : '<button class="chip" data-a="hClaim" data-v="' + s.id + '">' + t4('h_get') + '</button>') + '<button class="btn pri sm" style="min-height:44px" data-a="shopBuy" data-v="' + s.id + '">' + t4('h_bought') + '</button></div>').join('') + '</div>';
  h += '<h2 class="h2">' + t4('h_req') + '</h2><div class="wrap">' + ['Eggs','Milk','Bread','Onions','Carrots'].map(n => { const r = S.reqs.find(x => x.name === n && !x.done); return '<button class="chip" data-a="hReq" data-v="' + n + '" aria-pressed="' + !!r + '">' + (r ? svg('check', 14, 3) : '+') + esc(fn(n)) + '</button>'; }).join('') + '</div>' + (S.reqs.some(r => !r.done) ? '<p class="sub">' + t4('h_reqd') + ': ' + S.reqs.filter(r => !r.done).map(r => fn(r.name)).join(', ') + '</p>' : '');
  return '<div class="col">' + h + '</div>';
}
function helperKitchenHTML() {
  const its = S.items.slice().sort((a, b) => rank(a) - rank(b));
  return '<div class="col">' + head(t4('h_kitchen'), its.length + ' items') + '<div class="list">' + its.map(it => '<div class="li" style="cursor:default">' + icoI(it, 36) + '<span class="grow t">' + esc(fn(it.name)) + '</span><span class="pill ' + dinfo(it).c + '">' + dl(it) + '</span></div>').join('') + '</div></div>';
}

/* ---------- simple (translated) ---------- */
const langChips = () => '<div class="wrap">' + LANGS_S.map(l => '<button class="chip" style="min-height:48px;font-size:17px" data-a="setLang" data-v="' + l[0] + '" aria-pressed="' + (S.lang === l[0]) + '">' + l[1] + '</button>').join('') + '</div>';
simpleTodayHTML = function () {
  const urg = S.items.filter(i => !i.frozen && !i.listed && !i.prov && i.cat !== 'pantry').sort((a, b) => a.days - b.days).slice(0, 3);
  return '<div class="col big" style="gap:18px">' + head(greet4(), dayN()) + langChips() + '<button class="pill p-grn" style="align-self:flex-start;font-size:16px;padding:8px 14px;border:0;min-height:44px" data-a="openCarer">' + svg('users', 18) + t4('shared') + '</button>' +
    '<button class="btn pri full" style="min-height:100px;justify-content:flex-start;gap:16px;text-align:left" data-a="sVoice"><span class="fi" style="width:60px;height:60px;border-radius:30px;background:#fff;color:#1F6B45">' + svg('mic', 32) + '</span><span><span style="display:block;font-size:22px">' + t4('plan') + '</span><span style="font-size:16px;font-weight:500;color:#D9EBDF">' + t4('plan_sub') + '</span></span></button>' +
    '<h2 class="h2" style="font-size:22px">' + t4('first') + '</h2>' + urg.map(it => { const c = iinfo(it); return '<div class="card col" style="border:2px solid #18201A;gap:12px"><div class="between"><span class="row" style="gap:12px">' + icoI(it, 64) + '<span><b style="display:block;font-size:24px">' + esc(fn(it.name)) + '</b><span style="color:#3D453F;font-size:17px">' + qtyL(it) + '</span></span></span><span class="pill" style="font-size:16px;padding:6px 12px;background:' + (it.days <= 0 ? '#9A3209' : '#7A4D00') + ';color:#fff">' + dl(it) + '</span></div>' + (c.risk === 'high' ? '<div class="warn" style="font-size:16px">' + svg('alert', 20) + '<span>' + t4('care_warn') + '</span></div>' : '') + '<div class="g2"><button class="btn pri" data-a="act" data-v="use:' + it.id + '">' + t4('used') + '</button><button class="btn ghost" style="border:2px solid #1D5FA8;color:#1D5FA8" data-a="act" data-v="freeze:' + it.id + '">' + t4('freeze') + '</button></div><button class="btn ghost" style="border:2px solid #F0E0B4;background:#FFF8E6" data-a="safeOpen" data-v="' + it.id + '">' + svg('shield', 22) + t4('safe') + '</button></div>'; }).join('') + '</div>';
};
simpleMealsHTML = function () {
  const list = RECIPES.map(r => Object.assign({r:r}, resolve(r))).filter(x => x.ok && !recOK(x.r, x).hide).sort((a, b) => b.urg - a.urg).slice(0, 3);
  let h = head(t4('meals'), t4('meals_sub')) + (list.length ? list.map(x => '<div class="card col" style="border:2px solid #D5DCD6;gap:12px;padding:0;overflow:hidden">' + recipeArt(x.r, 110) + '<div class="col" style="gap:12px;padding:0 18px 18px"><b style="font-size:24px">' + rn(x.r) + '</b><span style="font-size:17px;color:#3D453F">' + x.r.time + ' ' + t4('min') + ' · ' + t4('uses') + ' ' + x.rows.filter(g => g.n).map(g => fn(g.n)).join(', ') + '</span><button class="btn pri full" data-a="startCook" data-v="' + x.r.id + '">' + t4('start') + '</button></div></div>').join('') : '<div class="card">' + t4('none') + '</div>');
  h += '<h2 class="h2" style="font-size:22px">' + t4('book') + '</h2>' + S.family.map(f => '<button class="card row" style="text-align:left;border:2px solid #D5DCD6" data-a="famOpen" data-v="' + f.id + '">' + svg('book', 28) + '<span class="grow"><b style="display:block;font-size:20px">' + esc(f.name) + '</b><span style="font-size:16px;color:#3D453F">' + esc(f.by) + '</span></span></button>').join('');
  return '<div class="col big" style="gap:18px">' + h + '</div>';
};
simpleHelpHTML = function () {
  const bigBtn = (a, ic, t1, t2, bg, bd) => '<button class="btn full" style="min-height:96px;background:' + bg + ';border:2px solid ' + bd + ';color:#18201A;justify-content:flex-start;gap:16px" data-a="' + a + '">' + svg(ic, 34) + '<span style="text-align:left"><span style="display:block">' + t1 + '</span><span style="font-size:16px;font-weight:500;color:#4F5851">' + t2 + '</span></span></button>';
  return '<div class="col big" style="gap:16px">' + head(t4('help'), t4('help_sub')) + bigBtn('safetyPick', 'shield', t4('safe'), t4('safe_sub'), '#FFF8E6', '#F0E0B4') + bigBtn('contact', 'phone', t4('talk'), t4('talk_sub'), '#EEF3EF', '#D5DCD6') + bigBtn('openCarer', 'users', t4('carer'), t4('carer_sub'), '#E9F2EC', '#CFE0D4') + bigBtn('saveRec', 'mic', t4('save'), t4('save_sub'), '#FCEDE4', '#F4D6C6') + '<b style="font-size:19px">' + t4('lang') + '</b>' + langChips() + '<button class="btn ghost full" data-a="settings">' + svg('gear', 24) + t4('settings') + '</button></div>';
};
sVoiceHTML = function () {
  const ph = U.sd.ph || 'on', list = RECIPES.map(r => Object.assign({r:r}, resolve(r))).filter(x => x.ok && !recOK(x.r, x).hide).sort((a, b) => b.urg - a.urg), x = list[0], rec = x ? x.r : RECIPES[0], names = x ? x.rows.filter(g => g.n).map(g => fn(g.n)) : [];
  const said = {en:'“I have ' + names.join(' and ').toLowerCase() + '.”', zh:'“我有' + names.join('和') + '。”', ms:'“Saya ada ' + names.join(' dan ').toLowerCase() + '.”', ta:'“என்னிடம் ' + names.join(', ') + ' உள்ளன.”'}[S.lang] || '';
  return '<div class="scroll big"><div class="col" style="min-height:100%;gap:22px">' + backBar(t4('plan')) + '<button class="mic ' + (ph === 'on' ? 'on' : '') + '" style="width:150px;height:150px;border-radius:75px;margin-top:20px" data-a="sVoice" aria-label="Speak again">' + svg('mic', 64, 1.8) + '</button><p style="margin:0;text-align:center;font-size:24px;font-weight:700">' + (ph === 'on' ? t4('listening') : said) + '</p>' +
    (ph === 'done' ? '<div class="card col" style="border:2px solid #1F6B45;gap:12px"><span style="color:#1F6B45;font-weight:800;font-size:16px">' + t4('trythis') + '</span><b style="font-size:26px">' + rn(rec) + '</b><span style="font-size:17px;color:#3D453F">' + rec.time + ' ' + t4('min') + '</span><button class="btn pri full" data-a="startCook" data-v="' + rec.id + '">' + t4('start') + '</button><button class="btn ghost full" data-a="sVoice">' + t4('again') + '</button></div>' : '<p class="sub" style="text-align:center;font-size:16px">Demo only: no audio is recorded.</p>') + '</div></div>';
};

/* ---------- other screens ---------- */
const cook3 = cookHTML;
cookHTML = function () {
  let html = cook3();
  if (U.ct !== 'plan') {
    const b = basket(), tw = TWISTS[(S.day + (S.mbDone || 0)) % TWISTS.length];
    const mb = '<div class="card col acc-p" style="gap:10px"><div class="col" style="gap:6px"><b style="font-size:16px">Mystery basket</b><span class="pill p-pur" style="align-self:flex-start">Twist: ' + tw + '</span></div><div class="wrap">' + b.map(i => '<span class="pill ' + dinfo(i).c + '" style="font-size:14px;padding:5px 11px">' + esc(i.name) + '</span>').join('') + '</div><span class="sub">Use 2 for +20 XP. New basket daily.</span><button class="btn pri full" data-a="mbCook">Find a recipe for this basket</button></div>';
    html = html.replace('<div class="card col" style="background:#FCEDE4', mb + '<div class="card col" style="background:#FCEDE4');
    const fam = '<h2 class="h2">From the family recipe book</h2>' + S.family.map(f => '<button class="card row" style="text-align:left" data-a="famOpen" data-v="' + f.id + '">' + svg('book', 22) + '<span class="grow"><b style="display:block">' + esc(f.name) + '</b><span class="sub">' + esc(f.by) + ' · uses ' + f.ings.join(', ').toLowerCase() + '</span></span></button>').join('');
    html = html.slice(0, -6) + fam + '</div>';
  }
  return html;
};
const shop3 = shopHTML;
shopHTML = function () {
  const reqs = S.reqs.filter(r => !r.done);
  let h = '';
  if (reqs.length) h += '<div class="card col" style="gap:8px;border-color:#CBB8E0">' + reqs.map(r => '<div class="row">' + av(r.by, 26) + '<span class="grow" style="font-size:14px"><b>' + mem(r.by)[1] + '</b> suggests <b>' + esc(r.name) + '</b></span><button class="chip" data-a="reqAdd" data-v="' + r.id + '">Add</button><button class="chip" data-a="reqNo" data-v="' + r.id + '">Not now</button></div>').join('') + '</div>';
  h += '<button class="btn ghost full" data-a="openChat">' + svg('chat', 18) + 'Send the list to the family chat</button>';
  if (S.connected) h += '<div class="note" style="background:#E9F2EC;border-color:#CFE0D4;color:#174F33">' + svg('receipt', 18) + '<span>Supermarket receipts import automatically. <button class="chip" style="min-height:32px" data-a="importNow">Import latest now</button></span></div>';
  return h + shop3();
};
const kitchen3 = kitchenHTML;
kitchenHTML = function () {
  if (S.htype !== 'flat' || U.kt !== 'fridge') return kitchen3();
  const keep = S.items, sh = U.shelf || 'all';
  if (sh !== 'all') S.items = S.items.filter(i => sh === 'shared' ? S.shared[i.id] : !S.shared[i.id]);
  let html = kitchen3(); S.items = keep;
  const chip = '<div class="wrap">' + [['all','All shelves'],['mine','My shelf'],['shared','Shared with flatmates']].map(x => '<button class="chip" data-a="shelf" data-v="' + x[0] + '" aria-pressed="' + (sh === x[0]) + '">' + x[1] + '</button>').join('') + '</div>';
  return html.replace('<div class="row" style="position:relative">', chip + '<div class="row" style="position:relative">');
};
const impact3 = impactHTML;
impactHTML = function () {
  const html = impact3(), t = st(), u = UNITS.find(x => x[0] === S.unit) || UNITS[0], avail = Math.floor(S.xp / 100) - S.gift;
  const extra = '<div class="card col" style="gap:10px"><h2 class="h2" style="font-size:14px">In everyday terms</h2><b style="font-size:26px">' + (Math.round(t.kg / u[2] * 10) / 10) + ' ' + u[1] + '</b><span class="sub">saved this week' + (u[3] ? ', ' + u[3] : '') + '.</span>' + chips(UNITS.map(x => [x[0], x[1].charAt(0).toUpperCase() + x[1].slice(1)]), S.unit, 'setUnit') + '</div>' +
    (window.LP ? LP.impactCard() : '') +
    '<button class="card row" style="text-align:left;background:#E8F3E8" data-a="openGarden"><span style="width:110px;flex:none">' + gardenSVG(66) + '</span><span class="grow"><b style="display:block">Kitchen garden: ' + plants() + ' plants</b><span class="sub">Grown together from every rescue</span></span></button>';
  return html.replace('<div class="card col" style="gap:6px"><h2 class="h2" style="font-size:14px">How we count', extra + '<div class="card col" style="gap:6px"><h2 class="h2" style="font-size:14px">How we count');
};
const onb3 = onbHTML;
onbHTML = function () {
  const st0 = U.onb, dots = '<div class="dots" style="margin:4px 0 6px">' + [0,1,2,3,4].map(i => '<i class="' + (i <= st0 ? 'on' : '') + '"></i>').join('') + '</div>', nav = '<div class="g2"><button class="btn ghost" data-a="onbBack">Back</button><button class="btn pri" data-a="onbNext">Continue</button></div>';
  if (st0 === 1) return '<div class="col fade">' + dots + '<h1 class="h1">Who’s Jiak Clean for?</h1><b>Language</b><div class="wrap">' + [['en','English'],['zh','中文'],['ms','Melayu'],['ta','தமிழ்'],['tl','Tagalog'],['id','Indonesia']].map(l => '<button class="chip" data-a="onbLang" data-v="' + l[0] + '" aria-pressed="' + (l[0] === 'tl' || l[0] === 'id' ? S.hlang === l[0] && S.mode === 'helper' : S.lang === l[0] && S.mode !== 'helper') + '">' + l[1] + '</button>').join('') + '</div>' +
    [['standard','Me or my household','Recipes, reminders, sharing and savings','home'],['kids','A family with kids 8–12','Rescue Missions kids can help with','star'],['teen','I’m 13–17','15-minute challenges with friends you invite','flame'],['simple','Simple and large','Big text in English, 中文, Melayu or தமிழ்','help'],['helper','I cook for a household','Helper view in Tagalog or Bahasa Indonesia','users']].map(m => '<button class="card" style="display:flex;gap:14px;align-items:center;text-align:left;padding:12px 14px;border:' + (S.mode === m[0] ? '2px solid #1F6B45;background:#F1F7F2' : '1px solid #E3E6DE') + '" data-a="onbMode" data-v="' + m[0] + '" aria-pressed="' + (S.mode === m[0]) + '"><span class="fi" style="width:44px;height:44px;background:#E9F2EC;color:#1F6B45">' + svg(m[3], 22) + '</span><span class="grow"><b style="display:block;font-size:16px">' + m[1] + '</b><span class="sub">' + m[2] + '</span></span></button>').join('') +
    '<div class="card between"><span><b>People at home</b><span class="sub" style="display:block">Sets portion sizes</span></span><span class="row"><button class="btn ghost ib" data-a="house" data-v="-1" aria-label="Fewer people">−</button><b style="font-size:20px;width:24px;text-align:center">' + S.house + '</b><button class="btn ghost ib" data-a="house" data-v="1" aria-label="More people">+</button></span></div>' + nav + '</div>';
  if (st0 === 2) return '<div class="col fade">' + dots + '<h1 class="h1">What matters, and when?</h1><div class="g2">' + WHY.map(w => '<button class="card" style="text-align:left;padding:12px;border:' + (S.why === w[0] ? '2px solid #1F6B45;background:#F1F7F2' : '1px solid #E3E6DE') + '" data-a="setWhy" data-v="' + w[0] + '" aria-pressed="' + (S.why === w[0]) + '"><b style="display:block;font-size:15px">' + w[1] + '</b><span class="sub">' + w[2] + '</span></button>').join('') + '</div>' +
    '<h2 class="h2">Pick your one daily moment</h2><p class="sub">One reminder, tied to your routine.</p><div class="list">' + CUES.map(c => '<button class="li" data-a="setCue" data-v="' + c[0] + '" aria-pressed="' + (S.cue === c[0]) + '">' + tog(S.cue === c[0]) + '<span class="grow t">' + c[1] + '</span></button>').join('') + '</div>' +
    '<button class="card between" style="text-align:left" data-a="toggleGame" aria-pressed="' + S.game + '"><span><b style="display:block">Points, streaks and quests</b><span class="sub">Off shows just the outcomes</span></span>' + tog(S.game) + '</button>' + nav + '</div>';
  return onb3();
};

/* ---------- sheets ---------- */
function kitSheet() {
  return '<div class="col">' + sheetHead('Your fridge kit') + '<p class="sub">Make urgent food the first thing everyone sees.</p>' +
    '<div class="card col" style="gap:8px"><b>1. Eat-Me-First box label</b><svg viewBox="0 0 300 90" width="100%" aria-hidden="true"><rect x="4" y="4" width="292" height="82" rx="14" fill="#F2B632"/><rect x="12" y="12" width="276" height="66" rx="10" fill="none" stroke="#18201A" stroke-width="2" stroke-dasharray="6 5"/><text x="150" y="50" text-anchor="middle" font-family="Figtree,system-ui,sans-serif" font-weight="800" font-size="26" fill="#18201A">EAT ME FIRST</text><text x="150" y="68" text-anchor="middle" font-family="Figtree,system-ui,sans-serif" font-size="13" fill="#18201A">Look here before you cook or snack</text></svg></div>' +
    '<div class="card col" style="gap:8px"><b>2. Use-it-up tape</b><svg viewBox="0 0 300 40" width="100%" aria-hidden="true"><rect y="6" width="300" height="28" fill="#F2B632"/>' + [0,1,2].map(i => '<text x="' + (20 + i * 100) + '" y="25" font-family="Figtree,system-ui,sans-serif" font-weight="800" font-size="12" fill="#18201A">USE IT UP →</text>').join('') + '</svg><div class="ig ig2">' + IG.tile('20–40%', 'less food binned', '#1F6B45') + IG.tile('~70', 'households tried it', '#5B3B85') + '</div>' + SRC('OzHarvest Use It Up Tape trial, via Monash Lens') + '</div>' +
    '<div class="card row" style="gap:14px"><svg width="86" height="86" viewBox="0 0 86 86" aria-hidden="true"><circle cx="43" cy="43" r="40" fill="#1F6B45"/><rect x="21" y="21" width="44" height="44" rx="6" fill="#fff"/>' + [[25,25],[25,45],[45,25],[35,35],[51,51],[29,55],[55,33]].map(p => '<rect x="' + p[0] + '" y="' + p[1] + '" width="7" height="7" fill="#18201A"/>').join('') + '</svg><span class="grow"><b style="display:block">3. Tap-to-log magnet</b><span class="sub">Tap or scan to log what you used.</span></span></div>' +
    '<button class="btn pri full" data-a="openTap">' + svg('magnet', 18) + 'Try tapping the magnet</button><p class="sub">Printing is off in this preview.</p></div>';
}
function tapSheet() {
  const urg = urgList();
  return '<div class="col">' + sheetHead('Fridge magnet tapped') + '<p class="sub">Use these first. One tap each.</p>' + (urg.length ? '<div class="list">' + urg.map(it => '<div class="li" style="cursor:default;flex-wrap:wrap">' + icoI(it, 40) + '<span class="grow"><span class="t" style="display:block">' + esc(it.name) + '</span><span class="s">' + dinfo(it).l + '</span></span><button class="btn pri sm" style="min-height:44px" data-a="act" data-v="use:' + it.id + '">Used</button><button class="btn ghost sm" style="min-height:44px" data-a="act" data-v="freeze:' + it.id + '">Freeze</button></div>').join('') + '</div>' : '<div class="card sub">Nothing urgent. All good.</div>') + '<button class="btn ghost full" data-a="closeSheet">Everything else is fine</button></div>';
}
function snapSheet() {
  const P = U.snap || {ph:'idle'};
  if (P.ph !== 'diff') return '<div class="col">' + sheetHead('Weekly fridge snap') + '<p class="sub">One photo a week keeps the list right.</p><div class="vf"><svg viewBox="0 0 350 220" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="350" height="220" fill="#DDE6EF"/><rect x="20" y="70" width="310" height="6" fill="#B9C6D3"/><rect x="20" y="150" width="310" height="6" fill="#B9C6D3"/><rect x="40" y="30" width="50" height="40" rx="6" fill="#F4F0E4"/><circle cx="130" cy="52" r="16" fill="#E8642C"/><ellipse cx="220" cy="54" rx="40" ry="14" fill="#3F8F5E"/><rect x="60" y="104" width="30" height="46" rx="5" fill="#fff"/><rect x="120" y="116" width="70" height="34" rx="8" fill="#F2B632"/><rect x="230" y="108" width="60" height="42" rx="8" fill="#C98A3A"/></svg>' + (P.ph === 'scan' ? '<div class="scanline"></div>' : '') + '</div><button class="btn pri full" data-a="snapGo">' + (P.ph === 'scan' ? '<span class="spin"></span>Comparing with last week…' : svg('cam', 18) + 'Snap the fridge') + '</button></div>';
  let h = '<div class="col">' + sheetHead('What changed') + '<p class="sub">We compared the photo with your list. Confirm what happened.</p>';
  h += P.gone.map(id => { const it = find(id); if (!it) return ''; const ch = P.ch[id]; return '<div class="card col" style="gap:8px"><div class="row">' + icoI(it, 36) + '<b class="grow">' + esc(it.name) + ' looks gone</b></div><div class="g3">' + [['used','Used it'],['binned','Binned'],['there','Still there']].map(o => '<button class="btn ' + (ch === o[0] ? 'pri' : 'ghost') + '" style="min-height:44px;font-size:13px;padding:0 6px" data-a="snapPick" data-v="' + id + ':' + o[0] + '">' + o[1] + '</button>').join('') + '</div></div>'; }).join('');
  if (P.nw) h += '<div class="card row">' + ico(P.nw, 36) + '<span class="grow"><b style="display:block">New: ' + P.nw + '</b><span class="sub">Not on your list yet. We’ll add it with an estimated date.</span></span>' + svg('check', 20, 2.6) + '</div>';
  return h + '<button class="btn pri full" data-a="snapApply">Update my kitchen</button></div>';
}
function tabaoSheet() {
  const T = U.tb || {q:'1'};
  return '<div class="col">' + sheetHead('Log tabao leftovers') + '<b>What did you bring home?</b>' + chips(HAWKER, T.d || '', 'tbDish') + '<b>How much?</b>' + chips([['1','1 portion'],['2','2 portions']], T.q, 'tbQty') + '<div class="note">' + svg('clock', 18) + '<span>' + OUT_TIPS[3] + '</span></div><button class="btn pri full" data-a="tbSave"' + (T.d ? '' : ' style="opacity:.55"') + '>Save to Leftovers Hub</button></div>';
}
function gardenSheet() { return '<div class="col">' + sheetHead('Kitchen garden') + gardenPanel(false) + '</div>'; }
function famSheet() {
  const f = S.family.find(x => x.id === U.sd.fid); if (!f) return '';
  return '<div class="col' + (S.mode === 'simple' ? ' big' : '') + '">' + sheetHead(esc(f.name)) + '<span class="sub">From ' + esc(f.by) + '’s recipe book</span><b>Ingredients</b><div class="wrap">' + f.ings.map(n => { const have = !!findN(n); return '<span class="pill ' + (have ? 'p-grn' : 'p-gry') + '" style="font-size:14px">' + (have ? '' : 'Need ') + esc(fn(n)) + '</span>'; }).join('') + '</div><b>Steps</b>' + f.steps.map((s, i) => '<div class="row" style="align-items:flex-start"><span class="fi" style="width:28px;height:28px;border-radius:14px;background:#E9F2EC;color:#1F6B45;font-weight:800">' + (i + 1) + '</span><span class="grow">' + esc(s) + '</span></div>').join('') + '<p class="sub">Shared with everyone at home. The grandchildren can cook it too.</p></div>';
}
function saveRecSheet() {
  const P = U.sr || {ph:'on'};
  const title = {en:'Ma’s steamed egg with spinach', zh:'妈妈的菠菜蒸蛋', ms:'Telur kukus bayam Mak', ta:'அம்மாவின் கீரை முட்டை'}[S.lang] || 'Ma’s steamed egg with spinach';
  return '<div class="col big">' + sheetHead(t4('save')) + '<button class="mic ' + (P.ph === 'on' ? 'on' : '') + '" data-a="saveRec" aria-label="Record again">' + svg('mic', 48, 1.8) + '</button><p style="margin:0;text-align:center;font-weight:700">' + (P.ph === 'on' ? t4('listening') : '“' + title + '”') + '</p>' + (P.ph === 'done' ? '<div class="card col" style="gap:6px;font-size:16px"><b>' + title + '</b><span>1. Beat 3 eggs with water and a pinch of salt.<br>2. Stir in chopped spinach.<br>3. Steam on low heat until just set, about 12 minutes.</span></div><button class="btn pri full" data-a="recSave">' + t4('save') + '</button>' : '<p class="sub" style="text-align:center">Demo only: no audio is recorded.</p>') + '</div>';
}
function safetyL() {
  const n = U.sd.name, l = S.lang, foods = ['Cooked rice','Chicken thigh','Milk','Bread','Eggs','Spinach'];
  return '<div class="col big"><div class="between"><h2 class="h1" style="font-size:28px">' + (n ? esc(fn(n)) : t4('safe_q')) + '</h2>' + iconBtn('closeSheet', 'close', 'Close') + '</div>' + (n ? (info(n).risk === 'high' ? '<div class="warn" style="font-size:17px">' + svg('alert', 22) + '<span>' + t4('risk_hi') + '</span></div>' : '') + '<p style="margin:0;font-size:21px;line-height:1.5">' + ((SAFE_L[l] && SAFE_L[l][n]) || info(n).safe) + '</p><button class="btn ghost full" data-a="safetyPick">' + t4('another') + '</button>' : '<div class="g2">' + foods.map(x => '<button class="btn ghost" style="min-height:64px;font-size:18px" data-a="safety" data-v="' + x + '">' + fn(x) + '</button>').join('') + '</div>') + '<p class="sub">Draft translation for the prototype.</p></div>';
}
function settingsExtra() {
  return '<details class="mset"><summary>More settings<span>Roles, language, receipts</span></summary><div class="col" style="gap:12px">' + '<b>View as</b><div class="wrap">' + [['owner','You (owner)'],['teen','Jun, 15'],['helper','Maria (helper)'],['simple','Mdm Lim (simple)'],['kids','Kids']].map(x => '<button class="chip" data-a="viewAs" data-v="' + x[0] + '" aria-pressed="' + ((x[0] === 'owner' && S.mode === 'standard') || S.mode === x[0]) + '">' + x[1] + '</button>').join('') + '</div><div class="list">' + MEMBERS.map(m => '<div class="li" style="cursor:default">' + av(m[0], 30) + '<span class="grow"><span class="t" style="display:block">' + m[1] + '</span><span class="s">' + (ROLE_L[m[0]] || '') + '</span></span></div>').join('') + '</div>' +
    '<b>Home type</b>' + chips([['family','Family'],['flat','Flatmates'],['solo','Just me']], S.htype, 'setHtype') +
    '<b>Your daily moment</b>' + chips(CUES.map(c => [c[0], c[1]]), S.cue, 'setCue') +
    '<b>Languages</b><span class="sub">Simple mode</span>' + chips(LANGS_S, S.lang, 'setLang') + '<span class="sub">Helper view</span>' + chips(LANGS_H, S.hlang, 'setHlang') + '<span class="sub">Draft translations.</span>' +
    '<button class="card between" style="text-align:left" data-a="openConnect"><span><b style="display:block">Supermarket receipts</b><span class="sub">' + (S.connected ? 'Connected (demo). New purchases import automatically.' : 'Import purchases automatically (demo)') + '</span></span>' + tog(S.connected) + '</button>' +
    '<button class="card between" style="text-align:left" data-a="openKit"><span><b style="display:block">Fridge kit</b><span class="sub">Eat-Me-First label, use-it-up tape, tap-to-log magnet</span></span>' + svg('magnet', 20) + '</button>' +
    '<b>Festive week</b>' + chips([['none','Off'],['cny','Chinese New Year'],['raya','Hari Raya'],['deepavali','Deepavali'],['xmas','Year-end']], S.festive, 'setFest') + '</div></details>';
}
const sheet3 = sheetHTML;
sheetHTML = function () {
  const t = U.sheet;
  const m = {kit:kitSheet, tap:tapSheet, snap:snapSheet, tabao:tabaoSheet, garden:gardenSheet, famrec:famSheet, saverec:saveRecSheet, myth:() => '<div class="col">' + sheetHead('Myth or fact') + mfHTML() + '</div>'};
  if (m[t]) return m[t]();
  if (t === 'safety' && S.mode === 'simple') return safetyL();
  let html = sheet3();
  if (t === 'settings') { const k = html.lastIndexOf('<b>Diet</b>'); if (k > 0) html = html.slice(0, k) + settingsExtra() + html.slice(k); }
  if (t === 'item' && S.htype === 'flat') { const it = find(U.sd.id); if (it) html = html.replace('<b style="font-size:15px">What happened to it?</b>', '<button class="li card" style="border:1px solid #E3E6DE" data-a="toggleShared" data-v="' + it.id + '">' + tog(!!S.shared[it.id]) + '<span class="grow t">Shared with flatmates</span></button><b style="font-size:15px">What happened to it?</b>'); }
  return html;
};

/* ---------- screens + paint ---------- */
const screen3 = screenHTML;
screenHTML = function (t) { const m = {detect:kidsDetectHTML, garden:kidsGardenHTML, badges:kidsStickersHTML, tchal:teenChalHTML, tsquad:teenSquadHTML, tlearn:teenLearnHTML, htoday:helperTodayHTML, hshop:helperShopHTML, hkitchen:helperKitchenHTML}; return m[t] ? m[t]() : screen3(t); };
const paint3 = paint;
paint = function () {
  applyLang(); paint3();
  const app = document.getElementById('app'), top = U.stack.length ? U.stack[U.stack.length - 1].t : '';
  app.classList.toggle('m-simple', S.mode === 'simple');
  app.classList.toggle('locked', top === 'lock');
  if (top === 'lock' || top === 'chat') document.getElementById('nav').classList.add('hide');
  const ms = document.getElementById('msgs'); if (ms) ms.scrollTop = ms.scrollHeight;
};

/* ---------- behaviour wrappers ---------- */
const act3 = act;
act = function (k, id) { act3(k, id); if (k === 'use' || k === 'freeze') maybeFact(); };
const openList3 = openList;
openList = function (id) { if (S.mode === 'teen' || S.role === 'teen') { toast('Neighbour sharing is for adults. Ask a grown-up to list it.'); return; } openList3(id); };
const nextDay3 = nextDay;
nextDay = function () {
  if (S.day === 6) S.lifeBase += st().rescued;
  nextDay3();
  if (S.connected && S.day % 2 === 0) setTimeout(() => importReceipt(true), 3200);
};
const finishCook3 = finishCook;
finishCook = function () {
  const names = U.cook.rows.filter(r => r.n && r.have).map(r => r.n), mb = basket().map(i => i.name), hit = names.filter(n => mb.indexOf(n) >= 0).length;
  finishCook3();
  if (hit >= 2) { S.xp += 20; S.weekXp += 20; S.mbDone = (S.mbDone || 0) + 1; save(); setTimeout(() => toast('Mystery basket bonus: +20 XP for using ' + hit + ' basket items.'), 3600); }
};
remind = function () {
  const lunch = S.items.find(i => isLeft(i) && i.plan && i.days <= 1 && !i.frozen);
  if (lunch) { banner('Lunchtime', 'Your ' + lunch.name.replace('Leftover: ', '').toLowerCase() + ' is best eaten today.', 'left'); return; }
  const u = urgList(), names = u.slice(0, 2).map(i => i.name.replace('Leftover: ', 'leftover ')).join(' and ');
  if (!u.length) { banner('Nothing urgent today', 'Your kitchen is in good shape. No more reminders today.', 'today'); return; }
  if (S.cue === 'groceries') banner('Unpacking groceries?', 'Put older food in front first: ' + names + '.', 'today');
  else if (S.cue === 'home') banner('Welcome home', names + ' need using. Tap for tonight’s ideas.', 'cook');
  else if (S.cue === 'dinner') banner('After dinner', 'Any leftovers to log? Tomorrow, use ' + names + '.', 'left');
  else banner('Use it or lose it', names + ' need using. Tap for recipes.', 'cook');
};
function importReceipt(auto) {
  const lines = RCPT[S.rcN % RCPT.length]; S.rcN++;
  lines.forEach(l => { S.items.push(mk(l[0], {qty:l[1], up:l[2] / l[1], src:'receipt'})); S.shop = S.shop.filter(s => s.name !== l[0]); });
  markAdded(); save(); paint();
  const txt = lines.map(l => l[0] + (l[1] > 1 ? ' ×' + l[1] : '')).join(', ');
  if (auto) banner('Groceries imported', txt + ' added from your receipt. Dates are estimates.', 'today'); else toast('Imported ' + txt + ' with your receipt prices.');
  return txt;
}

/* ---------- chat ---------- */
function chatReply(raw) {
  const t = raw.toLowerCase().trim();
  if (t.indexOf('receipt') >= 0) return 'Got your receipt. Added ' + importReceipt(false) + ' and ticked them off the list. Dates are estimates.';
  if (t.indexOf('cook') >= 0 || t.indexOf('dinner') >= 0) {
    const x = RECIPES.map(r => Object.assign({r:r}, resolve(r))).filter(y => y.ok && !recOK(y.r, y).hide).sort((a, b) => b.urg - a.urg).slice(0, 2);
    U.chatSug = x.map(y => y.r.id);
    if (!x.length) return 'Nothing is ready to cook right now. Want me to add the missing bits to the list?';
    return 'You can make these now:\n' + x.map((y, i) => (i + 1) + '. ' + y.r.name + ' (' + y.r.time + ' min' + (y.urg ? ', rescues ' + y.urg + ' urgent' : '') + ')').join('\n') + '\nReply 1 or 2 and I’ll tell everyone.';
  }
  if (/^[12]$/.test(t) && U.chatSug && U.chatSug[+t - 1]) { const id = U.chatSug[+t - 1]; S.tonight.pick = id; S.tonight.votes = {me:id, mei:id, jun:id}; return 'Done: tonight is ' + R(id).name + '. Who’s cooking? Reply “me” or pick in the app.'; }
  if (t === 'me') { S.tonight.cook = 'me'; return 'Great, you’re cooking tonight. I’ve let everyone know.'; }
  if (t.indexOf('list') >= 0) return S.shop.length ? 'Shared list:\n' + S.shop.map(s => '• ' + s.name + (s.claim ? ' (' + (s.claim === 'me' ? 'you' : mem(s.claim)[1]) + ' is getting it)' : '')).join('\n') : 'The list is empty.';
  if (t.indexOf('add ') === 0) { let n = raw.trim().slice(4); n = n.charAt(0).toUpperCase() + n.slice(1).toLowerCase(); const k = Object.keys(CAT).find(c => c.toLowerCase() === n.toLowerCase()); if (k) n = k; if (!S.shop.some(s => s.name === n)) S.shop.push({id:++nid, name:n, claim:null, small:false}); const have = S.items.some(i => i.name === n && !i.frozen); return 'Added ' + n + ' to the shared list.' + (have ? ' Heads up: there’s already some at home.' : ''); }
  if (t.indexOf('used ') === 0) { const q = t.slice(5), it = S.items.find(i => i.name.toLowerCase().indexOf(q) >= 0 && !i.listed); if (!it) return 'I couldn’t find “' + q + '” in the kitchen.'; act('use', it.id); return 'Marked ' + it.name + ' as used. Nice save!'; }
  if (t.indexOf('summary') >= 0) { const s = st(); return 'This week: ' + s.rescued + ' items rescued, ' + money(s.saved) + ' saved, ' + s.avoid + ' double buys avoided. Rescue streak: ' + S.streak + ' days. The garden has ' + plants() + ' plants.'; }
  return 'Try: “what can I cook?”, “list”, “add eggs”, “used tofu”, “summary”, or forward a receipt photo.';
}

/* ---------- actions ---------- */
const kStart3 = A.kStart, kStep3 = A.kStep, setMode3 = A.setMode, finishOnb3 = A.finishOnb, binReason3 = A.binReason, safeOpen3 = A.safeOpen, setLang = v => { S.lang = v; save(); paint(); };
const POOLS = [['Wash your hands with soap for 20 seconds.', 'Roll up your sleeves and wash your hands. Sing Happy Birthday twice!', 'Hands first: soap, scrub, rinse, dry.'], ['Find the {n} in the kitchen.', 'Be a food detective: bring the {n} to the table.', 'Check the Eat-Me-First box for the {n}.'], ['Ask a grown-up to help make {t}. Knives and the stove are grown-up jobs.', 'Plan with a grown-up: who chops, who stirs? You pick the bowl for {t}!'], ['Help stir, mix or arrange it on a plate.', 'Make it look fun: arrange it like a smiley face!', 'Set the table for everyone.'], ['Taste it and give it a star rating!', 'Ask everyone: thumbs up or thumbs down?', 'Take a photo for the family album, with a grown-up.']];
Object.assign(A, {
  toggleMore: () => { U.more = !U.more; paint(); },
  openLock: () => { U.sheet = null; U.stack.push({t:'lock'}); paint(); },
  lockCook: v => { U.stack = []; S.tab = 'cook'; U.sd = {sv:S.house, swaps:{}}; U.stack.push({t:'recipe', id:v}); paint(); },
  openChat: () => { U.sheet = null; U.stack.push({t:'chat'}); paint(); },
  chatSend: v => { const txt = (v || U.chatText || '').trim(); if (!txt) return; U.chatText = ''; S.chat.push({f:'me', t:v === 'receipt' ? '[Receipt photo]' : txt}); save(); paint(); setTimeout(() => { S.chat.push({f:'bot', t:chatReply(txt)}); S.chat = S.chat.slice(-30); save(); paint(); const i = document.getElementById('chatin'); if (i && !v) i.focus(); }, 550); },
  openKit: () => { U.sheet = 'kit'; paint(); },
  openTap: () => { U.sheet = 'tap'; paint(); },
  openSnap: () => { U.snap = {ph:'idle'}; U.sheet = 'snap'; paint(); },
  snapGo: () => { U.snap.ph = 'scan'; paint(); setTimeout(() => { const gone = S.items.filter(i => !i.frozen && !i.listed && !isLeft(i) && i.days <= 1).slice(0, 2).map(i => i.id); const nw = ['Yoghurt','Carrots','Apples'].find(n => !S.items.some(i => i.name === n)); U.snap = {ph:'diff', gone:gone, nw:nw, ch:{}}; gone.forEach(id => U.snap.ch[id] = 'used'); paint(); }, 1400); },
  snapPick: v => { const p = v.split(':'); U.snap.ch[+p[0]] = p[1]; paint(); },
  snapApply: () => { const P = U.snap; let n = 0; P.gone.forEach(id => { const it = find(id), c = P.ch[id]; if (!it || c === 'there') return; if (c === 'used') { logE('used', it, it.qty, urgent(it)); n++; } else logE('binned', it, it.qty, false, {why:'Spotted in fridge snap'}); S.items = S.items.filter(i => i !== it); }); if (P.nw) S.items.push(mk(P.nw)); markAdded(); U.sheet = null; if (n) rescueAct(); commit(10, 'Kitchen updated from your fridge snap.'); },
  tabao: () => { U.tb = {q:'1'}; U.sheet = 'tabao'; paint(); },
  tbDish: v => { U.tb.d = v; paint(); },
  tbQty: v => { U.tb.q = v; paint(); },
  tbSave: () => { if (!U.tb.d) { toast('Pick what you brought home first.'); return; } S.items.push(mk('Leftover: ' + U.tb.d, {days:1, qty:+U.tb.q, unit:'portion', est:false, pack:1, up:2.5, uk:.3})); U.sheet = null; commit(5, 'Saved. Eat it by tomorrow, or plan it for lunch.'); },
  orderLess: () => { S.log.push({id:++nid, t:'avoided', name:'Smaller hawker portion', val:1, kg:.15, c:true, d:S.day, src:'typical', why:'Ordered less'}); const sm = rescueAct(); commit(5, 'Nice: less on the plate, less in the bin.' + sm); },
  byo: () => { S.out.byo++; commit(5, 'Brought your own box: ' + S.out.byo + ' times so far.'); },
  openGarden: () => { U.sheet = 'garden'; paint(); },
  buyDecor: v => { const d = DECOR.find(x => x[0] === v); if (S.decor.indexOf(v) >= 0) { toast(d[1] + ' is already in your garden.'); return; } if (S.kids.stars < d[2]) { toast('You need ' + (d[2] - S.kids.stars) + ' more stars for the ' + d[1].toLowerCase() + '.'); return; } S.kids.stars -= d[2]; S.decor.push(v); save(); paint(); toast(d[1] + ' added to the garden!'); },
  openMyth: () => { U.mf = {i:0, ans:null, score:0}; if (S.mode === 'teen') { S.tab = 'tlearn'; U.sheet = null; U.stack = []; } else U.sheet = 'myth'; paint(); },
  mfAns: v => { const q = MYTHS[((S.mf.round * 5) % MYTHS.length + U.mf.i) % MYTHS.length]; U.mf.ans = v; if ((v === 'fact') === q[1]) { U.mf.score++; S.kids.stars++; S.xp += 5; S.weekXp += 5; if (window.LP) LP.award('mf:' + q[0].slice(0, 24), 5); } S.mf.n++; save(); paint(); },
  mfNext: () => { U.mf.i++; U.mf.ans = null; if (U.mf.i >= 5) S.mf.round++; save(); paint(); },
  mfAgain: () => { U.mf = {i:0, ans:null, score:0}; paint(); },
  openCarer: () => { U.sheet = null; U.stack.push({t:'carer'}); paint(); },
  carerAdd: v => { S.carer.added.push(v); save(); paint(); toast(v + ' added to Dad’s kitchen. He’ll see it on his phone.'); },
  carerTog: v => { S.carer[v] = !S.carer[v]; save(); paint(); },
  carerSave: () => { if (U.carerNote != null) S.carer.note = U.carerNote; save(); paint(); toast('Reminder text saved.'); },
  saveRec: () => { U.sr = {ph:'on'}; U.sheet = 'saverec'; paint(); setTimeout(() => { if (U.sr) { U.sr.ph = 'done'; paint(); } }, 1700); },
  recSave: () => { const title = {zh:'妈妈的菠菜蒸蛋', ms:'Telur kukus bayam Mak', ta:'அம்மாவின் கீரை முட்டை'}[S.lang] || 'Ma’s steamed egg with spinach'; S.family.push({id:'f' + (++nid), name:title, by:'Mdm Lim', ings:['Eggs','Spinach'], steps:['Beat 3 eggs with water and a pinch of salt.','Stir in chopped spinach.','Steam on low heat until just set, about 12 minutes.']}); U.sheet = null; save(); paint(); toast('Saved to the family recipe book.'); },
  famOpen: v => { U.sd = {fid:v}; U.sheet = 'famrec'; paint(); },
  setLang: setLang,
  setHlang: v => { S.hlang = v; save(); paint(); },
  onbLang: v => { if (v === 'tl' || v === 'id') { S.hlang = v; S.mode = 'helper'; } else { S.lang = v; if (v !== 'en') S.mode = 'simple'; else if (S.mode === 'helper') S.mode = 'standard'; } paint(); },
  setCue: v => { S.cue = v; save(); paint(); if (S.onboarded) toast('Your one daily reminder now comes: ' + CUES.find(c => c[0] === v)[1].toLowerCase() + '.'); },
  setHtype: v => { S.htype = v; save(); paint(); },
  toggleShared: v => { S.shared[v] = !S.shared[v]; save(); paint(); },
  shelf: v => { U.shelf = v; paint(); },
  openConnect: () => { S.connected = !S.connected; save(); paint(); if (S.connected) { toast('Connected (demo). Importing your latest purchase…'); setTimeout(() => importReceipt(true), 900); } else toast('Receipts disconnected.'); },
  importNow: () => importReceipt(false),
  setFest: v => { S.festive = v; save(); paint(); },
  giftMeal: () => { if (Math.floor(S.xp / 100) - S.gift < 1) { toast('Earn 100 more XP to fund a meal.'); return; } S.gift++; save(); paint(); confetti(); toast('Thank you! 1 meal funded through the food charity partner (sample).'); },
  setUnit: v => { S.unit = v; save(); paint(); },
  mbCook: () => { const b = bestFor(basket().map(i => i.name)); if (!b) return; A.recipe(b.r.id); toast('This one uses ' + b.o + ' of your basket items.'); },
  hClaim: v => { const s = S.shop.find(x => x.id === +v); s.claim = 'maria'; save(); paint(); },
  hReq: v => { const r = S.reqs.find(x => x.name === v && !x.done); if (r) { S.reqs = S.reqs.filter(x => x !== r); } else S.reqs.push({id:++nid, name:v, by:'maria', done:false}); save(); paint(); },
  reqAdd: v => { const r = S.reqs.find(x => x.id === +v); r.done = true; if (!S.shop.some(s => s.name === r.name)) S.shop.push({id:++nid, name:r.name, claim:'maria', small:false}); save(); paint(); toast(r.name + ' added. Maria will pick it up.'); },
  reqNo: v => { const r = S.reqs.find(x => x.id === +v); r.done = true; save(); paint(); },
  detDone: v => { if (S.stickers.indexOf(v) >= 0) return; const d = DETECT.find(x => x[0] === v); S.stickers.push(v); S.kids.stars++; confetti(); commit(5, 'Sticker earned: ' + d[2] + '! +1 star'); },
  tStart: () => { const its = teenItems(); if (its.length < 3) { toast('Add a few more foods first.'); return; } U.tc = {left:900, phase:'cook', ids:its.map(i => i.id), dish:null}; U.stack.push({t:'tchal'}); paint(); clearInterval(U.tcI); U.tcI = setInterval(() => { const T = U.tc; if (!T || T.phase !== 'cook') { clearInterval(U.tcI); return; } T.left = Math.max(0, T.left - 30); const el = document.getElementById('tctimer'); if (el) el.textContent = fmtT(T.left); if (!T.left) { T.phase = 'photo'; clearInterval(U.tcI); paint(); toast('Time! Snap your dish.'); } }, 1000); },
  tDone: () => { U.tc.phase = 'photo'; clearInterval(U.tcI); paint(); },
  tDish: v => { U.tc.dish = v; paint(); },
  tPost: () => { const T = U.tc; if (!T.dish) { toast('Name your dish first.'); return; } const names = []; T.ids.forEach(id => { const it = find(id); if (it) { names.push(it.name); logE('used', it, it.qty, urgent(it), {via:'cook'}); S.items = S.items.filter(i => i !== it); } }); S.meals++; S.teen.streak++; S.teen.dishes.unshift({name:T.dish, items:names}); U.tc = null; U.stack = []; S.tab = 'tsquad'; U.fade = true; rescueAct(); confetti(); commit(40, 'Posted to your squad. Squad streak: ' + S.teen.streak + ' days!'); },
  viewAs: v => { const mode = v === 'owner' ? 'standard' : v; S.role = v === 'owner' ? 'owner' : v; U.sheet = null; setMode3(mode); },
  kStart: () => {
    if (U.kidSel.length < 3) { toast('Pick ' + (3 - U.kidSel.length) + ' more foods first!'); return; }
    const its = U.kidSel.map(find).filter(Boolean), names = its.map(i => i.name), k = S.kids.missions;
    const best = RECIPES.map(r => ({r:r, o:r.ings.filter(g => g.n && names.indexOf(g.n) >= 0).length})).sort((a, b) => b.o - a.o)[0];
    const title = best.o ? best.r.name : 'Rescue snack plate', list = names.join(', ').toLowerCase();
    const steps = POOLS.map((p, i) => p[(k + i) % p.length].replace('{n}', list).replace('{t}', title.toLowerCase()));
    U.sd = {m:{title:title, names:names, ids:U.kidSel.slice(), step:0, badge:KBADGES[S.kids.earned % KBADGES.length], steps:steps, icons:['help','search','users','pot','star']}};
    U.stack.push({t:'kid'}); paint();
  },
  kStep: () => { const M = U.sd.m, fin = M && M.step === M.steps.length - 1; if (fin) S.kidFacts = Math.min(KIDFACTS.length, (S.kidFacts || 0) + 1); kStep3(); },
  setMode: v => { S.role = v === 'teen' ? 'teen' : v === 'helper' ? 'helper' : 'owner'; setMode3(v); if (v === 'teen') toast('Teen mode: challenges with friends you invite. No neighbour sharing.'); if (v === 'helper') toast('Helper view: Maria’s own screens, in her language.'); },
  finishOnb: v => { S.role = S.mode === 'teen' ? 'teen' : S.mode === 'helper' ? 'helper' : 'owner'; finishOnb3(v); },
  binReason: v => { binReason3(v); maybeFact(true); },
  safeOpen: v => { if (S.mode === 'simple' && S.lang !== 'en') { const it = find(v); U.sheet = 'safety'; U.sd = {name:it ? (SAFE_L.zh[it.name] ? it.name : null) : null}; S.tot.safety++; paint(); return; } safeOpen3(v); }
});

/* ---------- guide ---------- */
const g0 = document.querySelector('.guide'), g1 = g0.cloneNode(true); g0.replaceWith(g1);
g1.addEventListener('click', e => {
  const b = e.target.closest('[data-j]'); if (!b) return; const j = b.dataset.j;
  U.sheet = null; U.stack = []; U.cook = null; clearInterval(tick); clearInterval(U.tcI);
  if (j === 'nextday') { S.onboarded = true; nextDay(); return; }
  if (j === 'remind') { S.onboarded = true; paint(); remind(); return; }
  if (j === 'reset') { A.reset(); return; }
  if (j === 'onb') { S.onboarded = false; U.onb = 0; U.fade = true; save(); paint(); return; }
  S.onboarded = true;
  const modes = {helper:'helper', teen:'teen', kids:'kids', simple:'simple', carer:'simple'}, mode = modes[j] || 'standard';
  if (S.mode !== mode) { S.mode = mode; U.kidSel = []; }
  S.role = mode === 'teen' ? 'teen' : mode === 'helper' ? 'helper' : 'owner';
  S.tab = TABS[mode][0][0]; U.fade = true; U.more = false;
  if (j === 'lock') U.stack = [{t:'lock'}];
  if (j === 'magnet') U.sheet = 'tap';
  if (j === 'chat') U.stack = [{t:'chat'}];
  if (j === 'out') { U.tb = {q:'1'}; U.sheet = 'tabao'; }
  if (j === 'snap') { U.snap = {ph:'idle'}; U.sheet = 'snap'; }
  if (j === 'myth') { U.mf = {i:0, ans:null, score:0}; U.sheet = 'myth'; }
  if (j === 'cook') { S.tab = 'cook'; U.ct = 'recipes'; }
  if (j === 'festive') { const i = FEST_ORDER.indexOf(S.festive); S.festive = FEST_ORDER[i + 1 >= FEST_ORDER.length ? 1 : i + 1]; }
  if (j === 'helper' && S.hlang === 'en') S.hlang = 'tl';
  if (j === 'simple' && S.lang === 'en') S.lang = 'zh';
  if (j === 'carer') U.stack = [{t:'carer'}];
  if (j === 'impact') S.tab = 'impact';
  save(); paint();
  if (j === 'festive') toast(FESTIVE[S.festive][0] + ' is on. Tap again to try another festival.');
});

/* ---------- boot ---------- */
start = function (data) {
  S = data && data.v === 4 ? data : (load() || seed());
  nid = Math.max(S.nid || 100, ...S.items.map(i => i.id), ...S.shop.map(i => i.id), ...S.log.map(i => i.id), 100);
  clock(); setInterval(clock, 30000);
  paint(); metrics();
  try { window.claude && window.claude.hot && window.claude.hot.snapshot && window.claude.hot.snapshot(() => S); } catch (e) {}
};
if (window.claude && window.claude.hot && window.claude.hot.ready) window.claude.hot.ready(start); else start(window.claude && window.claude.hot ? window.claude.hot.data || {} : {});
})();
