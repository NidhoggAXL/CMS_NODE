/**
 * 商品与分类种子数据
 * 50 条真实电商商品，分类与图片一一对应，图片均为 Pexels 免费图库不同照片
 */

const categories = [
  { id: 1, name: "数码电子", parent_id: 0, sort: 1 },
  { id: 2, name: "家用电器", parent_id: 0, sort: 2 },
  { id: 3, name: "智能手机", parent_id: 1, sort: 1 },
  { id: 4, name: "笔记本电脑", parent_id: 1, sort: 2 },
  { id: 5, name: "平板电脑", parent_id: 1, sort: 3 },
  { id: 6, name: "智能穿戴", parent_id: 1, sort: 4 },
  { id: 7, name: "耳机音响", parent_id: 1, sort: 5 },
  { id: 8, name: "游戏设备", parent_id: 1, sort: 6 },
  { id: 9, name: "摄影摄像", parent_id: 1, sort: 7 },
  { id: 10, name: "电视显示器", parent_id: 1, sort: 8 },
  { id: 11, name: "冰箱", parent_id: 2, sort: 1 },
  { id: 12, name: "洗衣机", parent_id: 2, sort: 2 },
  { id: 13, name: "清洁电器", parent_id: 2, sort: 3 },
  { id: 14, name: "厨房小电", parent_id: 2, sort: 4 },
  { id: 15, name: "空调取暖", parent_id: 2, sort: 5 },
];

function pexels(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;
}

const goods = [
  // 智能手机 x7
  { name: "Apple iPhone 15 Pro Max 256GB", category_id: 3, price: 9999, stock: 86, description: "A17 Pro 芯片，钛金属机身，4800 万像素主摄，支持 ProRes 视频录制与 Action 按钮。", image: pexels(18525574) },
  { name: "Samsung Galaxy S24 Ultra", category_id: 3, price: 9699, stock: 72, description: "第三代骁龙 8 移动平台，内置 S Pen，2 亿像素主摄，Galaxy AI 智能体验。", image: pexels(1092675) },
  { name: "小米 14 Ultra", category_id: 3, price: 6499, stock: 120, description: "徕卡光学全焦段四摄，骁龙 8 Gen 3，2K 120Hz 护眼屏，5300mAh 硅碳负极电池。", image: pexels(6999695) },
  { name: "HUAWEI Mate 60 Pro", category_id: 3, price: 6999, stock: 65, description: "麒麟 9000S 芯片，超可靠玄武架构，卫星通话，5000 万像素超光变主摄。", image: pexels(404280) },
  { name: "OPPO Find X7 Ultra", category_id: 3, price: 5999, stock: 98, description: "双潜望四主摄，哈苏人像模式，骁龙 8 Gen 3，100W 超级闪充。", image: pexels(788946) },
  { name: "vivo X100 Pro", category_id: 3, price: 4999, stock: 110, description: "天玑 9300 旗舰芯片，蔡司 APO 超级长焦，5400mAh 蓝海电池，IP68 防尘防水。", image: pexels(1092644) },
  { name: "荣耀 Magic6 Pro", category_id: 3, price: 5699, stock: 88, description: "荣耀鹰眼相机，5600mAh 第二代青海湖电池，骁龙 8 Gen 3，4320Hz 高频 PWM 调光。", image: pexels(51383) },

  // 笔记本电脑 x5
  { name: "Apple MacBook Pro 14 M3 Pro", category_id: 4, price: 15999, stock: 45, description: "M3 Pro 芯片，18 小时续航，Liquid Retina XDR 显示屏，六扬声器音响系统。", image: pexels(18105) },
  { name: "ThinkPad X1 Carbon Gen 11", category_id: 4, price: 12999, stock: 38, description: "第 13 代英特尔酷睿处理器，14 英寸 2.8K OLED 屏，军工级 durability，仅 1.12kg。", image: pexels(7974) },
  { name: "Dell XPS 14 9440", category_id: 4, price: 11999, stock: 52, description: "英特尔 Evo 认证，3.2K OLED 触控屏，CNC 铝合金机身，四扬声器杜比全景声。", image: pexels(325153) },
  { name: "华为 MateBook X Pro 2024", category_id: 4, price: 9499, stock: 60, description: "Ultra 9 处理器，柔性 OLED 原色屏，超轻薄金属机身，超级终端多设备协同。", image: pexels(392757) },
  { name: "华硕 ROG 幻 16 Air", category_id: 4, price: 13999, stock: 28, description: "锐龙 9 8945HS，RTX 4070 显卡，16 英寸 2.5K 240Hz 星云屏，薄至 14.9mm。", image: pexels(163065) },

  // 平板电脑 x4
  { name: "Apple iPad Pro 12.9 M2", category_id: 5, price: 8999, stock: 55, description: "M2 芯片，Liquid Retina XDR 显示屏，支持 Apple Pencil 2 与妙控键盘。", image: pexels(1334597) },
  { name: "Samsung Galaxy Tab S9 Ultra", category_id: 5, price: 7999, stock: 42, description: "14.6 英寸 Dynamic AMOLED 2X 屏，骁龙 8 Gen 2 for Galaxy，IP68 防水，附 S Pen。", image: pexels(1866149) },
  { name: "小米平板 6 Pro", category_id: 5, price: 2499, stock: 150, description: "骁龙 8+ 处理器，11 英寸 2.8K 144Hz 屏，8600mAh 大电池，四扬声器杜比全景声。", image: pexels(3207856) },
  { name: "华为 MatePad Pro 13.2", category_id: 5, price: 5199, stock: 68, description: "13.2 英寸柔性 OLED 屏，星闪技术，HarmonyOS 4，M-Pencil 第三代手写笔。", image: pexels(8419111) },

  // 智能穿戴 x4
  { name: "Apple Watch Ultra 2", category_id: 6, price: 6499, stock: 75, description: "49mm 钛金属表壳，双频 GPS，36 小时续航，100 米防水，适合极限运动。", image: pexels(437037) },
  { name: "华为 WATCH GT 4 Pro", category_id: 6, price: 1688, stock: 130, description: "466mm AMOLED 屏，两周超长续航，TruSeen 5.5+ 监测，100+ 运动模式。", image: pexels(393047) },
  { name: "Garmin Fenix 7 Pro", category_id: 6, price: 5980, stock: 40, description: "专业户外 GPS 运动手表，太阳能充电，Multi-Band GNSS，内置地图与训练指标。", image: pexels(2805590) },
  { name: "小米手环 8 Pro", category_id: 6, price: 399, stock: 300, description: "1.74 英寸 AMOLED 大屏，14 天典型续航，150+ 运动模式，独立 GNSS 定位。", image: pexels(2526875) },

  // 耳机音响 x5
  { name: "Sony WH-1000XM5", category_id: 7, price: 2499, stock: 95, description: "业界领先降噪，30 小时续航，LDAC 高解析音频，多点连接，折叠便携设计。", image: pexels(1649771) },
  { name: "Apple AirPods Pro 2", category_id: 7, price: 1899, stock: 180, description: "H2 芯片主动降噪，自适应音频，个性化空间音频，MagSafe 充电盒。", image: pexels(1649770) },
  { name: "Bose QuietComfort Ultra", category_id: 7, price: 3299, stock: 60, description: "CustomTune 智能校准，沉浸式音频，24 小时续航，Premium 级舒适佩戴。", image: pexels(15806890) },
  { name: "Sennheiser Momentum 4", category_id: 7, price: 2699, stock: 55, description: "60 小时超长续航，42mm 换能器，自适应降噪，Smart Control App 个性化音效。", image: pexels(7106330) },

  // 游戏设备 x4
  { name: "Sony PlayStation 5 Slim", category_id: 8, price: 3899, stock: 35, description: "定制 AMD Zen 2 CPU，825GB SSD，4K 120Hz 输出，DualSense 无线控制器。", image: pexels(371924) },
  { name: "Microsoft Xbox Series X", category_id: 8, price: 3899, stock: 32, description: "12 TFlops GPU，1TB 定制 SSD，真 4K 游戏，Quick Resume 快速恢复功能。", image: pexels(4526396) },
  { name: "Nintendo Switch OLED", category_id: 8, price: 2299, stock: 80, description: "7 英寸 OLED 屏幕，64GB 存储，增强音频，TV/桌面/掌机三种模式。", image: pexels(442576) },
  { name: "Steam Deck OLED 512GB", category_id: 8, price: 4599, stock: 25, description: "7.4 英寸 HDR OLED 屏，AMD APU，512GB NVMe SSD，50Wh 电池最长 8 小时。", image: pexels(33509746) },

  // 摄影摄像 x4
  { name: "DJI Mini 4 Pro", category_id: 9, price: 4788, stock: 48, description: "249g 轻量机身，全向主动避障，4K/60fps HDR 视频，34 分钟最长飞行时间。", image: pexels(336232) },
  { name: "Sony Alpha 7C II", category_id: 9, price: 13999, stock: 22, description: "3300 万像素全画幅，BIONZ XR 处理器，4K 60p 视频，紧凑轻量化机身约 514g。", image: pexels(128909) },
  { name: "GoPro HERO12 Black", category_id: 9, price: 3198, stock: 65, description: "5.3K60 视频，HyperSmooth 6.0 防抖，10-bit 色彩，防水 10m，Enduro 长续航电池。", image: pexels(909928) },

  // 电视显示器 x4
  { name: "Samsung 65QN85C Neo QLED", category_id: 10, price: 8999, stock: 18, description: "65 英寸 Neo QLED 4K，Quantum Matrix Technology，120Hz 刷新率，杜比视界。", image: pexels(1444416) },
  { name: "LG 55C3 OLED evo", category_id: 10, price: 7999, stock: 20, description: "55 英寸 OLED evo 面板，α9 AI 处理器 Gen6，HDMI 2.1 四接口，webOS 智能系统。", image: pexels(1444417) },
  { name: "Dell UltraSharp U2723QE", category_id: 10, price: 4299, stock: 45, description: "27 英寸 4K IPS Black 技术，98% DCI-P3 色域，USB-C 90W 供电，ComfortView Plus。", image: pexels(4490118) },

  // 冰箱 x3
  { name: "海尔 BCD-502WGHFD14S8U1", category_id: 11, price: 5299, stock: 28, description: "502L 十字对开门，风冷无霜，一级能效，DEO 净味，干湿分储抽屉。", image: pexels(5824883) },
  { name: "西门子 KM56FS40TI", category_id: 11, price: 8999, stock: 12, description: "610L 对开门，零度保鲜科技，变频压缩机，iQ300 系列，德国品质。", image: pexels(5591453) },
  { name: "美的 BCD-468WKPZM", category_id: 11, price: 3299, stock: 40, description: "468L 法式多门，PT 净味抗菌，双变频一级能效，360° 风冷循环。", image: pexels(885350) },

  // 洗衣机 x3
  { name: "松下 XQG100-NA-V90", category_id: 12, price: 4599, stock: 35, description: "10kg 洗烘一体，纳诺怡 X 除菌除味，全触控操作，稀土永磁 BLDC 电机。", image: pexels(4108715) },
  { name: "小天鹅 TG100V88WMADT", category_id: 12, price: 3299, stock: 50, description: "10kg 滚筒，水魔方冷水洗，纳米银离子除菌，BLDC 变频电机一级能效。", image: pexels(38325) },
  { name: "海尔 EG100HBND178SU1", category_id: 12, price: 3999, stock: 42, description: "10kg 洗烘一体，晶彩触控屏，智能投放，微蒸汽空气洗，巴氏除菌。", image: pexels(4108716) },

  // 清洁电器 x3
  { name: "戴森 V15 Detect", category_id: 13, price: 5490, stock: 30, description: "激光探测微尘，230AW 强劲吸力，LCD 屏实时显示，五重整机 HEPA 过滤。", image: pexels(6995207) },
  { name: "石头 Roborock S8 Pro Ultra", category_id: 13, price: 4999, stock: 38, description: "双滚刷设计，6000Pa 吸力，全自动基站洗拖布烘干，Reactive 3D 避障。", image: pexels(1893556) },

  // 厨房小电 x4
  { name: "美的 MB-FB40S701", category_id: 14, price: 599, stock: 120, description: "4L IH 电磁加热电饭煲，1300W 大火力，8 层复合内胆，18 分钟快煮。", image: pexels(5560494) },
  { name: "九阳 DJ13B-D08D", category_id: 14, price: 399, stock: 150, description: "1.3L 免滤豆浆机，破壁免滤技术，智能预约，不锈钢机头。", image: pexels(37307) },
  { name: "飞利浦 HD9252 空气炸锅", category_id: 14, price: 699, stock: 90, description: "4.1L 大容量，Rapid Air 热旋风，7 种预设菜单，可拆卸洗碗机友好。", image: pexels(210126) },
  { name: "苏泊尔 CYSB50YC9002", category_id: 14, price: 499, stock: 85, description: "5L 电压力锅，双胆设计，24 小时预约，十重安全保护，一键排气。", image: pexels(4220087) },

  // 空调取暖 x4
  { name: "格力 KFR-35GW/NhGe1BAj", category_id: 15, price: 3299, stock: 60, description: "1.5 匹新一级能效，云佳系列，7 档风速，56℃ 高温自洁，独立除湿。", image: pexels(2724749) },
  { name: "Daikin FTXM352RAC", category_id: 15, price: 4599, stock: 45, description: "1.5 匹变频空调，康达效应气流，Streamer 除菌，R32 环保冷媒。", image: pexels(1571463) },
  { name: "小米 1.5 匹巨省电", category_id: 15, price: 2199, stock: 100, description: "新一级能效 APF 5.27，全直流变频，自清洁，接入米家智能生态。", image: pexels(1131458) },
  { name: "美的 KFR-35GW/N8KS1-1", category_id: 15, price: 2799, stock: 75, description: "酷省电系列，1.5 匹新一级，ECO 节能模式，APP 远程控制，高温自清洁。", image: pexels(1571455) },
];

module.exports = { categories, goods };
