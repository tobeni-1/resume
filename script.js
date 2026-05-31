/* ============================================
   涂雨晴个人简历网站 — 交互脚本
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
  initHTimeline();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initTimelineObserver();
  initModal();
  initBackToTop();
});

// ==================== HORIZONTAL TIMELINE ====================
function initHTimeline() {
  const nodes = document.querySelectorAll('.h-node');
  const panels = document.querySelectorAll('.work-panel');
  if (!nodes.length) return;

  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const id = node.dataset.id;
      // Deactivate all
      nodes.forEach(n => n.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      // Activate target
      node.classList.add('active');
      const panel = document.getElementById('panel-' + id);
      if (panel) panel.classList.add('active');
    });
  });

  // On mouse leave of the entire timeline area, revert to default (first node)
  const timeline = document.getElementById('hTimeline');
  if (timeline) {
    timeline.addEventListener('mouseleave', () => {
      nodes.forEach(n => n.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      nodes[0].classList.add('active');
      const firstPanel = document.getElementById('panel-' + nodes[0].dataset.id);
      if (firstPanel) firstPanel.classList.add('active');
    });
  }
}

// ==================== NAVBAR ====================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('active'));
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('active'));
  });
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('active');
    }
  });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      const navH = document.getElementById('navbar')?.offsetHeight || 70;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset - navH - 16,
        behavior: 'smooth'
      });
    });
  });
}

// ==================== TIMELINE OBSERVER ====================
function initTimelineObserver() {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
  items.forEach(item => observer.observe(item));
}

// ==================== MODAL ====================
function initModal() {
  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  const closeBtn = document.getElementById('modalClose');
  if (!overlay || !modal || !content) return;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const html = getProjectContent(card.dataset.project);
      if (html) {
        content.innerHTML = html;
        openModal();
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
  });

  function openModal() {
    overlay.classList.add('active');
    document.body.classList.add('modal-open');
    modal.scrollTop = 0;
    if (typeof lucide !== 'undefined') setTimeout(() => lucide.createIcons(), 50);
  }
  function closeModal() {
    overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

function getProjectContent(id) {
  const map = {
    'metro': metroHTML,
    'citydev': cityDevHTML,
    'rail-research': railResearchHTML,
    'recycle-research': recycleResearchHTML,
  };
  return map[id] || '<p>内容加载中...</p>';
}

// ================================================
//  项目卡片 1：某地铁集团十五五战略规划
//  叙事逻辑：需求 → 洞察 → 策略 → 解决 → 效果
// ================================================
const metroHTML = `
<h2>某地铁集团十五五战略规划</h2>

<div class="project-overview">
  <h4>📋 项目概述</h4>
  <p><strong>项目背景：</strong>集团主业承压，增长乏力，亟需增强自我造血能力。主导集团旗下资源经营、物业服务两大业务板块的经营诊断和业务策略分析。</p>
  <p><strong>我负责的工作：</strong>作为项目核心成员，独立负责两大业务板块的全流程分析——通过案头研究、财务数据分析、同行对标和高管访谈，识别业务增长瓶颈，制定"存量提质+增量拓展"策略，并撰写项目汇报方案推动高层决策。</p>
</div>

<div class="modal-flow">
  <span class="flow-step">项目需求</span>
  <span class="flow-arrow">→</span>
  <span class="flow-step">我的洞察</span>
  <span class="flow-arrow">→</span>
  <span class="flow-step">提出的策略</span>
  <span class="flow-arrow">→</span>
  <span class="flow-step">解决的问题</span>
  <span class="flow-arrow">→</span>
  <span class="flow-step">达到的效果</span>
</div>

<h3>一、项目需求</h3>
<p>国家收紧地铁投资批复，行业从建设时代步入运营时代，财政支持减弱，地铁运营亏损持续扩大。该集团<strong>亟需增强自我造血能力</strong>，实现从"重建设"向"建设运营并重"的转型。同时，经营性业务需要从依赖内部资源转向参与市场竞争，从财务投资转向产业投资。</p>

<h3>二、我的洞察</h3>
<p>我负责集团旗下<strong>资源经营</strong>和<strong>物业服务</strong>两大板块的经营诊断。通过案头研究、财务分析、同行对标和高管访谈，我发现了以下关键问题：</p>

<h4>资源经营板块</h4>
<ul>
  <li><strong>广告业务营收几乎腰斩：</strong>分析近4年财务数据发现，传统平面媒体上刊率持续走低，难以满足新时期广告主需求</li>
  <li><strong>商业经营增长停滞：</strong>部分商铺资源禀赋较差、位置偏远，难以打包租赁</li>
  <li><strong>存量天花板明显：</strong>与行业内相近客流体量的地铁企业对比，单位里程收入已处于前列水平，存量业务提升空间有限</li>
</ul>

<div class="evidence-box">
  <div class="evidence-label">📋 分析素材示例</div>
  <p>对广告业务三种经营模式（外包/合资/自营）进行对比分析，统计不同媒介的上刊率数据；对商业经营业务，统计不同线路、不同类型的商业资源总量及租赁情况，发现租赁率与资源禀赋强相关。</p>
</div>

<h4>物业服务板块</h4>
<ul>
  <li><strong>利润率持续下降：</strong>营收规模增长但利润率走低，服务高度集中在保安、保洁等低附加值基础物管</li>
  <li><strong>科技转型浮于表面：</strong>目前仅采购清洁机器人、无人机等科技产品，缺乏底层技术能力建设</li>
  <li><strong>外部业务依赖集团资源：</strong>客户来源靠集团资源或国企优势，市场化竞争力不足</li>
</ul>

<h3>三、提出的策略</h3>

<h4>资源经营：存量提质 + 增量拓展</h4>
<ul>
  <li><strong>经营模式升级：</strong>高客流商业街从"打包租赁"转向"自主经营"，开展精准招商运营，提升资产运营能力</li>
  <li><strong>多业务融合：</strong>拓展广告业务边界，向文化传媒业务衍生——策划引入"轨道+文体活动"，强化与文化传媒、广告和文创的多业务融合</li>
  <li><strong>盘活闲置资源：</strong>扫描轨交企业行业实践，布局光伏、仓储物流、低空经济等增量业务</li>
</ul>

<div class="evidence-box">
  <div class="evidence-label">📋 策略研究素材示例</div>
  <p>梳理头部轨交企业在商业经营、广告传媒、"轨道+经济"方向的实践案例：商业经营方面，轨交企业纷纷强化自主经营能力，打造自有商管品牌并对外轻资产输出；广告方面，向文化传媒业务衍生，将广告资源与城市文旅、文创业务融合。</p>
</div>

<h4>物业服务：产品线升级 + 科技转型</h4>
<ul>
  <li><strong>构建轨交物业全场景能力：</strong>从基础保安保洁延伸至风水电维护、安检、清洁消杀等全面轨交物管服务，打造1-2个标杆项目</li>
  <li><strong>拓展高附加值赛道：</strong>向B端（商办/产业园）和G端（医院/学校）物管领域拓展</li>
  <li><strong>"以场景换技术"：</strong>发挥轨交场景优势，与外部科技企业合作研发定制化智能清洁产品——初期服务集团内部，未来对外销售</li>
</ul>

<h3>四、解决的问题</h3>
<ul>
  <li><strong>识别了增长瓶颈的根因：</strong>不是简单的市场环境问题，而是经营模式（以租赁为主）和业务边界（限于传统广告/基础物管）的双重局限</li>
  <li><strong>明确了转型方向和路径：</strong>从租赁经营向自营/合作经营转变，从传统广告向文化传媒升级，从基础物管向高附加值赛道延伸</li>
  <li><strong>形成了可执行的业务策略：</strong>每项策略均包含具体举措、行业对标和资源需求</li>
</ul>

<h3>五、达到的效果</h3>
<div class="result-highlight">
  <h4>🎯 核心成果</h4>
  <ul>
    <li>制定<strong>营收利润年均复合增速7%</strong>的发展目标</li>
    <li>"高价值商业街自营""文化传媒跨界合作""盘活闲置资源"等关键举措<strong>经高管研讨达成共识</strong></li>
    <li>策略方案<strong>正式写入集团十五五战略规划报告</strong>，进入落地执行阶段</li>
  </ul>
</div>
`;

// ================================================
//  项目卡片 2：某城投平台十五五战略规划
//  叙事逻辑：需求 → 洞察 → 策略 → 解决 → 效果
// ================================================
const cityDevHTML = `
<h2>某城投平台十五五战略规划</h2>

<div class="project-overview">
  <h4>📋 项目概述</h4>
  <p><strong>项目背景：</strong>集团受地产下行影响，经营效益连续下滑，亟需寻找发展新动能。主要负责经营诊断、标杆研究和财务建模。</p>
  <p><strong>我负责的工作：</strong>作为项目核心成员，独立完成集团及6家子公司的业财诊断、标杆企业深度研究、五年财务模型搭建——为每家子公司搭建利润表、资产负债表、现金流预测表，建立三张表勾稽关系，并拉通集团与子公司财务和业务人员统一数据口径，最终输出集团五年经营目标表。</p>
</div>

<div class="modal-flow">
  <span class="flow-step">项目需求</span>
  <span class="flow-arrow">→</span>
  <span class="flow-step">我的洞察</span>
  <span class="flow-arrow">→</span>
  <span class="flow-step">提出的策略</span>
  <span class="flow-arrow">→</span>
  <span class="flow-step">解决的问题</span>
  <span class="flow-arrow">→</span>
  <span class="flow-step">达到的效果</span>
</div>

<h3>一、项目需求</h3>
<p>受地产行业下行影响，该集团营收利润连续下滑，负债规模持续增长。集团仍以开发建设业务为主，向运营端和产业端转型有限，<strong>亟需寻找增长新动能</strong>。同时，集团面临两项重点任务：</p>
<ul>
  <li><strong>片区开发：</strong>新承接管委会下达的片区开发任务，缺少相关经验，需在本次规划中明确开发模式和发展路径</li>
  <li><strong>产业升级：</strong>集团有大量产业园区和运营投资团队，但并未赋能当地产业发展，需升级经营模式、加强板块联动</li>
</ul>

<h3>二、我的洞察</h3>
<p>我负责集团的经营诊断和标杆研究工作，通过业财分析和外部对标，发现了以下关键问题：</p>

<h4>业财诊断</h4>
<ul>
  <li><strong>结构性风险：</strong>分析集团近5年财务报表，识别出营收利润持续下滑与负债规模同步扩张的"剪刀差"——这是比单纯亏损更危险的信号</li>
  <li><strong>转型瓶颈：</strong>拆解各业务板块经营效益后发现，传统建设主业在衰退，而新业务（运营、产业投资）的转型成效有限，尚未形成替代支撑</li>
</ul>

<div class="evidence-box">
  <div class="evidence-label">📋 分析素材示例</div>
  <p>同比分析集团各个业务板块近5年经营效益：建设业务占比仍超60%，但毛利率逐年下降；运营服务和产业投资板块虽有增长，但体量尚小（合计不到20%），且增速不足以弥补主业下滑缺口。</p>
</div>

<h4>标杆研究启示</h4>
<ul>
  <li><strong>启示一（板块协同）：</strong>湖北联投新城集团通过板块专业分工和协同优势，构建"片区经营为引领，开发、运营、产业投资、施工多板块协同"的格局，实现片区全链条开发运营</li>
  <li><strong>启示二（精准招商）：</strong>苏高新集团坚持"产业定位为起点→明确目标客群和市场定位→精准招商和运营需求前置"的闭环逻辑</li>
  <li><strong>启示三（产业研究）：</strong>围绕区域主导产业，强化产业研究和产品规划，明确专业园区的产业方向和功能定位</li>
</ul>

<h3>三、提出的策略</h3>

<h4>片区开发：全链条协同</h4>
<ul>
  <li>借鉴标杆企业"板块协同"经验，构建"片区经营引领 → 片区开发 → 房产开发 → 产业运营 → 产业投资 → 施工建设"的多板块协同格局</li>
  <li>将集团的施工建设能力、园区运营能力和产业投资能力整合到片区开发链条中，实现内部资源的最大化利用</li>
</ul>

<h4>产业升级：精准化运营</h4>
<ul>
  <li>针对专业垂直产业园区，建立"产业定位→产品规划→精准招商→增值服务"的标准化运营流程</li>
  <li>强化产业研究能力，聚焦区域产业发展和科技创新需求，明确各园区的差异化产业方向</li>
</ul>

<h4>财务保障：科学化测算</h4>
<ul>
  <li>为集团及旗下6家核心子公司分别搭建<strong>利润表、资产负债表、现金流预测表</strong>，建立三张表之间的勾稽关系</li>
  <li>采用自下而上方式汇总至集团层面，同时考虑内部交易抵消、融资安排与偿债节奏</li>
</ul>

<div class="evidence-box">
  <div class="evidence-label">📋 财务建模示例</div>
  <p>每家子公司根据其各项细分业务的过往经营效益和行业发展趋势，假设未来的发展增速和利润率；净利润作为新增资产关联资产负债表；增量借贷、还本付息等因素同步影响资产负债和现金流两张表。通过多轮与集团及子公司财务、业务人员的沟通迭代，确保数据口径一致、测算结果合理。</p>
</div>

<h3>四、解决的问题</h3>
<ul>
  <li><strong>填补了片区开发经验的空白：</strong>通过标杆研究为集团提供了可借鉴的开发模式和实施路径</li>
  <li><strong>打通了板块协同的堵点：</strong>将原本各自为政的建设、运营、投资板块整合为全链条服务体系</li>
  <li><strong>建立了量化的目标体系：</strong>从定性的"要转型"变成了定量的五年经营目标，解决了战略落地"最后一公里"</li>
</ul>

<h3>五、达到的效果</h3>
<div class="result-highlight">
  <h4>🎯 核心成果</h4>
  <ul>
    <li>输出集团及6家核心子公司<strong>五年经营目标表</strong>，涵盖资产负债、营收利润和现金流完整测算</li>
    <li>模型经多轮跨部门沟通和迭代，<strong>已用于集团年度预算编制</strong></li>
    <li>标杆研究成果转化为实际业务策略，为片区开发和产业升级提供了清晰路线图</li>
  </ul>
</div>
`;

// ================================================
//  专题研究 1：巴黎地铁（仅截取巴黎地铁部分）
// ================================================
const railResearchHTML = `
<h2>巴黎地铁可持续发展案例研究</h2>

<div class="research-overview">
  <h3>研究概述</h3>
  <div class="overview-grid">
    <div class="overview-item">
      <div class="overview-label">1. 轨道交通业务定位</div>
      <div class="overview-value">准公共产品 · 政府采购服务</div>
    </div>
    <div class="overview-item">
      <div class="overview-label">2. 政府角色</div>
      <div class="overview-value">作为投资建设主体（IDFM），核心是获取企业纳税+政府补贴。以巴黎大区的社会企业作为主要承担者获取公共交通税和票务收入，减少对地方财政的依赖，并由财政以补贴的方式补齐公共交通建设投资和运营维护经营缺口（税务和票务以外的资金）。</div>
    </div>
    <div class="overview-item">
      <div class="overview-label">3. 企业角色</div>
      <div class="overview-value">作为运营商（RATP），核心是服务购买合同+技术输出。RATP以政府购买方式提供地铁建设管理和运营维护服务，获取可覆盖运营成本的服务报酬，在超额完成服务质量指标后获得激励收益；同时依托巴黎大区的成熟技术和运营经验，以技术输出形式抢占外部市场，扩大市场化运营收益，实现运营层面的精益化和可持续发展。</div>
    </div>
    <div class="overview-item">
      <div class="overview-label">4. 企业营业收入</div>
      <div class="overview-value">服务报酬收入、管理输出等业务外拓收入。</div>
    </div>
    <div class="overview-item">
      <div class="overview-label">5. 面临挑战</div>
      <div class="overview-value">政府财政支出压力大，财政支出可持续性。</div>
    </div>
  </div>
</div>

<a class="pdf-view-link" href="pdf-viewer.html?file=巴黎地铁可持续发展案例研究分析报告.pdf&title=巴黎地铁可持续发展案例研究分析报告" target="_blank" rel="noopener">
  <i data-lucide="external-link" style="width:16px;height:16px;"></i> 查看原始研究报告（PDF）
</a>

<div class="report-body">

<h4>（一）基本情况</h4>

<p><strong>1. 建设历程</strong></p>
<p>巴黎地铁作为全球最早运营的地铁系统之一，其发展大致可分为四个阶段：①核心路网成型（1895-1920s）：1895 年巴黎市议会投票决定由市政府出资建设地铁 1 号线，到 1929 年 10 条地铁线路投运，地铁网络主干线基本成型覆盖巴黎核心区，线路总长达 112 公里；②线路扩张阶段（1930-1980s）：30 年代初巴黎市区人口增长停滞，郊区人口大幅增长，地铁逐步向郊区扩张，原有线路延长，区域快线（RER）也逐步兴起并接入地铁网络，开创"地铁+RER"模式，到 1990 年 15 条地铁线路长达 199 公里，5 条 RER 线路总长 398 公里；③自动化升级阶段（1990-2010s）：巴黎地铁新建全自动化线路，同时对部分传统线路进行自动化改造；④大巴黎时代（2010 年 - 至今）：启动"大巴黎 1"快线项目，计划修建长达 200 公里的全新自动轨道快线，进一步提高中心城外围的交通流动性。</p>

<p><strong>2. 运营模式</strong></p>
<p>目前，巴黎城市轨道交通网络主要包括了地铁（Métro）、区域快线（RER）、区域铁路（Transilien）和有轨电车（Tramway），与地面公交共同构成巴黎的公共交通系统。巴黎市政府将公共交通服务作为一项社会公益服务，公共交通线路由政府管理机构巴黎大区交通管理委员会（IDFM）负责规划和投资，然后以成本加成和政府购买服务模式交由运营公司建设、运营和维护。服务报酬收入通常可以覆盖运营公司的运营管理和维护支出，实现盈亏平衡。</p>

<p><strong>3. 运营现状</strong></p>
<p><strong>（1）运营里程：</strong>截至 2024 年末，巴黎地铁共有 16 条线路，总里程 240.6 公里，设 320 座站点，覆盖整个巴黎市区及部分近郊区域，尤其是在巴黎市区，几乎实现"500 米一站"。此外，巴黎区域快线（RER）有 5 条主线，线路总长 602 公里，共有 257 座站点，其中 33 座位于巴黎市区，其余分布在近郊。</p>
<p><strong>（2）客运量：</strong>2024 年的地铁客运量达 14.76 亿人次，日均客运量 404 万人次，客流强度达 1.68 万人次/公里/日，占大巴黎公共交通客运总量（310.8 亿人次）的 47.5%。</p>
<p><strong>（3）运营可靠性：</strong>由于 IDFM 在服务合同中加强对运营服务质量的要求，2024 年巴黎地铁累计准点率为 96.18%，相较 2023 年的 92.73% 有明显提升，但仍有部分线路的准点率不到 90%。2025 年上半年的调查显示乘客满意度为 88.2%，相较 2024 年的 87% 也有明显提升。</p>

<h4>（二）巴黎公共运输公司（RATP）可持续运营分析</h4>

<p><strong>1. 公司基本情况</strong></p>
<p>自 1949 年起，巴黎地铁由巴黎公共运输公司（RATP）负责建设、运营和维护。发展至今，RATP 获得巴黎大区范围内地铁（16 条线）、RER（A、B 线）、巴士（4800 辆）、有轨电车（18 条线）等交通线路的运营管理权，承担了巴黎 80% 的客运量。同时布局国际市场，通过子公司 RATP Dev 运营五大洲 16 个国家的公共交通系统，服务超过 780 座城市，全球年客流量超 41 亿人次，成为全球第三大城市公共交通运营商。</p>

<p><strong>（1）发展历程</strong></p>
<p><strong>第一阶段（1949 年成立 - 20 世纪 90 年代初）本土运营者：</strong>RATP 于 1949 年正式成立，通过国有化整合了巴黎大区的各类公共交通运营商，核心定位为"建设和运营好巴黎本地的交通网络"。该阶段形成了两大核心能力的沉淀：一是高密度、大客流、多模式换乘的运营经验；二是在巴黎地铁 14 号线的建设和运营中，实践了"全自动无人驾驶地铁技术"。</p>
<p><strong>第二阶段（20 世纪 90 年代 - 21 世纪初）国际化的初步探索与模式确立：</strong>随着欧洲放松管制和全球城市化的推进，RATP 逐步开展全球化布局。①成立专门机构：RATP 成立了全资子公司 RATP Dev，专门负责在国际市场上提供咨询、技术援助和运营管理服务。②轻资产模式：以"咨询顾问和管理合同"的形式参与国际项目，为许多国家的新建地铁项目（如韩国仁川地铁、墨西哥城地铁）提供技术咨询和员工培训。③从咨询到运营：凭借咨询项目中建立的信誉，开始争取直接运营海外交通网络的全权合同，包括获得"意大利米兰"公交网络的运营权等，证明了其模式可以在巴黎之外成功复制。</p>
<p><strong>第三阶段（21 世纪初 - 2010 年代末）全球扩张：</strong>①技术优势打开市场：成熟的"全自动地铁运营经验"成为国际招标中的决定性优势，运营中国香港、沙特阿拉伯、伦敦、休斯顿和达拉斯等不同城市公共交通线路。②业务模式多元化：不仅限于地铁和公交，还将业务拓展至城际铁路、有轨电车、机场快线等多种交通模式，塑造了综合交通解决方案的能力。</p>
<p><strong>第四阶段（2010 年代末至今）集团化重组与创新生态：</strong>①集团化架构重组：2019 年，RATP 进行重大改组，成立 RATP 集团。②创新与可持续发展：一是收购或合作多家运营商；二是探索共享单车、电动滑板车等"最后一公里"解决方案，构建完整的出行生态。</p>

<p><strong>（2）经营业务</strong></p>
<p>RATP 集团业务涵盖公共交通服务、基础设施管理、城市服务、安全服务等多领域，其中公共交通服务是最大的营收来源。2024 年 RATP 集团总营收 71.4 亿欧元，公共交通服务营收达 57.34 亿欧元，占总营收的 80%，基础设施管理业务营收达 11.79 亿元，占总营收的 17%。</p>

<p style="font-family:var(--font-mono);font-size:0.7rem;font-weight:600;letter-spacing:0.06em;color:var(--color-accent);text-align:center;margin-top:var(--space-lg);">表 1 &nbsp; RATP 业务构成及营收分析</p>

<div style="overflow-x:auto;margin:var(--space-md) 0 var(--space-lg);">
<table style="width:100%;border-collapse:collapse;font-size:0.78rem;text-align:left;">
<thead>
<tr style="background:var(--color-accent-subtle);">
<th style="padding:8px 10px;border:1px solid var(--color-border);font-weight:600;color:var(--color-ink);">业务</th>
<th style="padding:8px 10px;border:1px solid var(--color-border);font-weight:600;color:var(--color-ink);">业务概述</th>
<th style="padding:8px 10px;border:1px solid var(--color-border);font-weight:600;color:var(--color-ink);">业务范围</th>
<th style="padding:8px 10px;border:1px solid var(--color-border);font-weight:600;color:var(--color-ink);">收入来源</th>
<th style="padding:8px 10px;border:1px solid var(--color-border);font-weight:600;color:var(--color-ink);white-space:nowrap;">2024年营收<br>(亿欧元)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-weight:600;color:var(--color-ink);">公共交通服务</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-size:0.76rem;">巴黎大区：负责法国巴黎大区传统垄断性公共交通网络运营服务；参与公开市场竞争拿到新型线路的运营权<br>其他地区：负责法国及海外交通网络的开发与运营，通过全球约 100 家子公司运作</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-size:0.76rem;">公共交通运营：涵盖地铁、公交、有轨电车、RER 等多种公共交通运营<br>配套服务：车站内活动运营、零售网点管理</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-size:0.76rem;">基础收入：与 IDFM 约定的服务报酬<br>附加收入：广告、商业租赁、罚款收入<br>补贴：政府及欧盟的补贴</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);text-align:right;vertical-align:top;font-weight:600;">38.38<br><span style="color:var(--color-text-muted);font-weight:400;">(巴黎大区)</span><br>18.96<br><span style="color:var(--color-text-muted);font-weight:400;">(其他地区)</span></td>
</tr>
<tr style="background:var(--color-bg-warm);">
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-weight:600;color:var(--color-ink);">城市服务</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-size:0.76rem;">主要提供"智慧可持续城市"相关服务</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-size:0.76rem;">电信：部署通信基础设施<br>房地产：地产开发与运营<br>能源：与能源集团合作参与能源项目<br>城市物流：依托公交场站资源开展城市物流服务<br>新型出行：投资并运营创新出行相关项目</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-size:0.76rem;">—</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);text-align:right;vertical-align:top;font-weight:600;">0.42</td>
</tr>
<tr>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-weight:600;color:var(--color-ink);">基础设施管理</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-size:0.76rem;">负责交通基础设施的维护、更新与安全保障，服务于集团长期运营的铁路网络及外部重大项目（如大巴黎快线）</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-size:0.76rem;">长期网络维护：管理 RATP 铁路网络的基础设施，负责设施的日常维护与更新<br>重大项目支持：参与大巴黎快线网络的筹备、维护及技术管理</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-size:0.76rem;">基础收入：与 IDFM 约定的服务报酬<br>大巴黎快线项目的筹备与维护收入<br>政府补贴</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);text-align:right;vertical-align:top;font-weight:600;">11.79</td>
</tr>
<tr style="background:var(--color-bg-warm);">
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-weight:600;color:var(--color-ink);">安全服务</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-size:0.76rem;">负责公共交通场景的安全保障</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-size:0.76rem;">保障乘客、员工的生命和财产安全</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-size:0.76rem;">按服务付费</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);text-align:right;vertical-align:top;font-weight:600;">1.66</td>
</tr>
<tr>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-weight:600;color:var(--color-ink);">其他服务</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-size:0.76rem;">票务与出行服务集成、商业空间管理、设施维护</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-size:0.76rem;">设计、集成、运营并维护票务系统和多模式出行信息系统<br>营销并管理交通设施内的商业空间<br>为机场、医院等提供电梯/自动扶梯维护及安全系统安装服务</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);vertical-align:top;font-size:0.76rem;">—</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);text-align:right;vertical-align:top;font-weight:600;">0.19</td>
</tr>
<tr style="background:var(--color-accent-subtle);">
<td colspan="4" style="padding:8px 10px;border:1px solid var(--color-border);text-align:right;font-weight:700;color:var(--color-ink);">合计</td>
<td style="padding:8px 10px;border:1px solid var(--color-border);text-align:right;vertical-align:top;font-weight:700;color:var(--color-accent);font-size:0.85rem;">71.40</td>
</tr>
</tbody>
</table>
</div>
<p style="font-size:0.72rem;color:var(--color-text-muted);text-align:right;">数据来源：RATP 2024 Annual Report</p>

<p><strong>2. 可持续经营分析</strong></p>
<p>近年来 RATP 的营收逐年增加，2024 年营收总额达到 71.4 亿欧元，同比增长 9.6%；息税前利润常年为正。RATP 能够实现可持续平衡主要可以概括为以下几方面：</p>
<p><strong>（1）RATP 与 IDFM 签订服务购买合同保障运营和财务的可持续性：</strong>RATP 营业收入主要来源于 IDFM 支付的报酬（基于其在巴黎提供的公共交通服务、基础设施管理服务等），2024 年 IDFM 向 RATP 支付 52.75 亿欧元，在集团 2024 年总营收占比约 74%。IDFM 支付的报酬主要可以分为运营报酬、投资报酬等。运营报酬根据 RATP 的运营成本进行核算，可以覆盖 RATP 运营公共交通线路的人员、能源等运营成本，投资报酬可以覆盖地铁等基础设施的折旧和资本利息支出费用。此外还设置超额服务奖金，用于激励 RATP 超额完成服务质量指标，如 2024 年公交服务覆盖率从 86% 上升至 90%，乘客满意度达 87%，触发额外约 2500 万欧元的绩效奖金。</p>
<p><strong>（2）积极布局外部市场：</strong>RATP 下设专业子公司负责经营管理外部市场业务，优先选择进入"人口密集、交通升级需求强"的国内市场或"政府投资力度大、自动化/低碳需求强"的外国市场，以轻资产输出方式，提供地铁投资-建设-运营等全链条咨询和地铁运营服务。2024 年国际市场贡献营收 11.79 亿欧元，占总营收比重约 16.5%，比 2023 年增加约 1 个百分点。</p>

<h4>（三）IDFM 可持续运营分析</h4>
<p>巴黎的轨道交通规划和投资任务由政府管理机构 IDFM 负责。IDFM 收入支出整体平衡：2024 年 IDFM 实际运营支出为 115 亿欧元，其中 105 亿欧元用于运营商的公共交通网络运营。IDFM 总营收 126 亿欧元，能够保证巴黎公共交通系统持续稳定运行，营收构成主要包括：</p>
<ul>
  <li><strong>公共交通税（最重要收入来源）：</strong>面向所有在公共交通服务范围内且职工人数超过 9 人的企业征收，按照工资总额的一定比例上缴。2024 年公共交通税款收入 64 亿欧元，占全年收入 50.8%，是保证公共交通可持续的重要来源。</li>
  <li><strong>票务收入：</strong>巴黎大区政策规定企业要为乘坐公共交通上下班通勤的员工报销 50% 的票价，吸引更多居民选择公共交通出行。2024 年票务收入 43 亿元，占总营收比重 34%。</li>
  <li><strong>财政补贴弥补收支缺口：</strong>政府补贴来自中央政府和地方政府，若大巴黎区公共交通建设投资和运营维护经营还有资金缺口，将由财政补齐。</li>
</ul>

</div>
`;

// ================================================
//  专题研究 2：国有企业发展资源循环利用产业研究
// ================================================
const recycleResearchHTML = `
<h2>国有企业发展资源循环利用产业的模式与实践路径研究</h2>

<div class="report-body">

<p>循环经济是一种以资源的高效利用和循环利用为核心，以"减量化、再利用、资源化"为原则，以低消耗、低排放、高效率为基本特征，符合可持续发展理念的经济新增长模式，是对"大量生产、大量消费、大量废弃"的传统增长模式的根本变革。资源循环利用产业是指为节约资源和循环利用废弃物而提供物质基础和技术保障的产业，是循环经济体系的末端环节，也是决定循环经济能否闭环周转的关键环节。</p>

<a class="pdf-view-link" href="pdf-viewer.html?file=【研究报告】国有企业发展资源循环利用产业的模式与实践路径研究.pdf&title=国有企业发展资源循环利用产业研究" target="_blank" rel="noopener">
  <i data-lucide="external-link" style="width:16px;height:16px;"></i> 查看原始研究报告（PDF）
</a>

<h3>第一部分 为什么要布局资源循环产业</h3>

<h4>一、政策导向，大势所趋</h4>
<p>为推动绿色低碳发展，促进资源再生循环利用，国家层面发布了一系列政策文件，表明发展循环经济，已经成为近年来国家重要的经济政策导向：</p>
<ul>
  <li><strong>《加快构建废弃物循环利用体系的意见》</strong>：到2030年建成覆盖全面、运转高效、规范有序的废弃物循环利用体系，资源循环利用产业规模、质量显著提高，废弃物循环利用水平总体居于世界前列</li>
  <li><strong>《"十四五"循环经济发展规划》</strong>：到 2025 年，循环型生产方式全面推行，绿色设计和清洁生产普遍推广，资源综合利用能力显著提升，资源循环型产业体系基本建立。资源循环利用产业产值达到 5 万亿元</li>
  <li><strong>《2030年前碳达峰行动方案》</strong>：抓住资源利用这个源头，大力发展循环经济，全面提高资源利用效率。到2025年，大宗固废年利用量达到40亿吨左右；废钢铁等9种主要再生资源循环利用量达到4.5亿吨</li>
  <li><strong>《2024-2025年节能降碳行动方案》</strong>：加强废旧产品设备回收处置供需对接、开展企业回收目标责任制行动、加强工业装备、信息通信、风电光伏、动力电池等回收利用</li>
  <li><strong>《中共中央国务院关于加快经济社会发展全面绿色转型的意见》</strong>：要大力发展循环经济，健全废弃物循环利用体系，到 2030年大宗固体废弃物年利用量达到45亿吨左右，主要资源产出率比2020年提高45%左右</li>
</ul>

<h4>二、"两新"政策注入强心剂</h4>
<p>新一轮大规模设备更新和消费品以旧换新行动政策的发布，将极大促进资源回收利用水平的提高和再生资源需求量增加，助力资源循环产业高质量发展：</p>
<ul>
  <li><strong>《关于 2025 年加力扩围实施大规模设备更新和消费品以旧换新政策的通知》</strong>：增加超长期特别国债支持重点领域设备更新的资金规模。继续向地方直接安排超长期特别国债资金，用于支持消费品以旧换新。将资源循环纳入超长期特别国债支持范围，中央财政对地方资金支持比例达85%-95%</li>
  <li><strong>《推动大规模设备更新和消费品以旧换新行动方案》</strong>：实施设备更新、消费品以旧换新、回收循环利用、标准提升四大行动</li>
  <li><strong>《关于加力支持大规模设备更新和消费品以旧换新的若干措施》</strong>：统筹安排3000亿元左右超长期特别国债资金，加力支持大规模设备更新和消费品以旧换新</li>
</ul>

<h4>三、蓝海市场，大有可为</h4>
<p>自《"十四五"循环经济发展规划》提出2025年资源循环利用产业产值达5万亿目标，近几年产业规模保持两位数的高速增长：</p>
<ul>
  <li>2021年产业规模：32018.7亿元，增速30.5%</li>
  <li>2022年产业规模：36043.1亿元，增速12.6%</li>
  <li>2023年产业规模：40774.4亿元，增速13.1%</li>
  <li>2025年目标：50000亿元</li>
</ul>
<p>根据《推动大规模设备更新和消费品以旧换新行动方案》发展目标，到2027年，工业、农业、建筑、交通、教育、文旅、医疗等领域设备投资规模较2023年增长25%以上。报废汽车回收量较2023年增加约一倍，二手车交易量较2023年增长45%，废旧家电回收量较2023年增长30%，再生材料在资源供给中的占比进一步提升。</p>
<p>目前各类家电潜在替换需求量约2.37亿台，若从2024年开始超期使用的家电逐步进行更新，在未来三年内完成全部替换，则每年潜在的以旧换新家电规模约为2.43亿台。我国每年因置换而产生的新车销售规模已达600万至700万辆，置换率约为30%，预计本轮补贴政策下将释放的置换需求约为436.4万辆。</p>
<p>2023年我国主要再生资源的回收量为3.76亿吨，同比增长1.53%，但距离到2025年主要再生资源年利用量达到4.5亿吨的目标还有不小距离，为企业布局再生资源回收行业提供机会。主要品类包括废钢铁、废有色金属、废塑料、废纸、废轮胎、废弃电器电子产品、报废机动车、废旧纺织品、废玻璃、废电池等。我国主要再生资源回收利用情况与世界先进国家仍有较大差距——中国市政废物回收率约15%，远低于德国(52%)、韩国(45%)、比利时(51%)等国家。</p>

<h4>四、央企入局，大刀阔斧</h4>
<p>我国资源循环产业规模持续扩大，但行业发展尚不成熟，目前行业仍以中小型民营企业为主，缺乏规模化和专业化的国有龙头企业。截止2024年9月，我国废弃资源综合利用业相关企业中，注册资金在100万元以下的约3.5万家，占总量的53.4%，而资金超过1亿元的仅占总量的0.5%。</p>
<p>2024年10月成立的中国资源循环集团有限公司，由国务院国资委（20%）、中国石油化工集团（20%）、中国宝武钢铁集团（20%）、华润集团（20%）、中国铝业集团（10%）、中国五矿集团（10%）共同出资。目标打造全国性、功能性的资源回收再利用平台；聚焦国家战略，搭建多层次、立体化、高效率的资源回收再利用体系，建设世界一流资源循环再利用产业集团。业务涵盖退役风电回收、废塑料循环利用、废钢资源回收、废旧纺织品循环利用、报废机动车回收、家电及电子产品回收、光伏组件回收等。</p>

<h3>第二部分 资源循环产业布局可行性</h3>

<h4>一、资源循环利用产业链全景</h4>
<p>我国资源循环利用产业链包括上游废弃端—中游回收加工端—下游再利用三个环节：</p>
<ul>
  <li><strong>上游（废弃端）：</strong>工业企业（生产工业固废，废弃物集中度高）、市政部门及居民（产生生活垃圾，分散性强、回收成本高）、建筑行业（产生建筑垃圾，且单项目产生量大）、新能源产业（产生退役动力电池、废旧光伏组件等，废弃物技术处理门槛高）</li>
  <li><strong>中游（回收加工端）：</strong>个体回收商（分散式回收低值废弃物，能覆盖社区末梢，但缺乏标准化）→ 专业回收公司（规模化回收特定品类，依托渠道网络和资质壁垒）→ 互联网回收平台（通过线上预约实现高效回收，数据驱动优化回收路径）→ 分拣中心（对混合废弃物进行机械/人工分选）→ 预处理企业（负责破碎、清洗、压缩等初级加工）→ 再生资源加工厂（将废弃物转化为再生原料，技术门槛高，需要规模化生产降低成本）→ 技术研发机构（开发再生处理技术，通过产学研结合，推动高值化利用）</li>
  <li><strong>下游（再利用端）：</strong>制造业企业（采购再生材料替代原生资源，受成本因素影响）、能源企业（将废弃物转化为能源如垃圾发电、生物柴油，依赖政府补贴和政策支持）、建筑行业、新能源产业、二次产品市场（销售再生制品如再生建材、二手商品）</li>
</ul>

<h4>二、行业发展痛点</h4>
<p><strong>痛点一：产业链协同不足。</strong>当前再生资源产业链条普遍偏短，相关企业的系统耦合协调度比较低，组织衔接程度低，产业结构调整主要集中在回收和再利用上，企业发展水平层次不齐、竞争力弱，上下游企业之间未达到协同发展的程度，存在供需错配、流通低效等问题。废旧资源再生利用产业的服务种类比较单一，尚未形成基于社会化、专业化分工，集废物回收、分解、加工、利用、无害化处理等为一体的循环再生利用产业体系。产业链上存在断环、孤环，无法将产业链各环节上的行为主体形成一个共同体。产业链内生发展动力不足，存在价值链分配扭曲——如回收环节毛利率远低于再生环节毛利率。</p>
<p><strong>痛点二：资源回收率低下。</strong>由于再生资源来源广泛、回收路径复杂，国内回收企业普遍规模较小、设备简陋、技术落后，分拣仍由人工进行粗略分类，不同类型原料难以有效分离，下游企业仍需要花费人力和资金进行预处理，造成回收环节成本高，回收利用率低下。同时，一些再生资源回收企业缺乏规范处置能力，污染治理设施不完善，配套设施欠缺，生产和堆放过程中极易产生扬尘、废水等环境问题。</p>
<p><strong>痛点三：资源化利用技术水平较弱。</strong>一是分拣自动化与精细度不足：企业规模普遍偏小，精细化分拣欠缺，以废弃电子产品回收利用为例，拆解处理以手工拆解为主，机械处理为辅，属于劳动密集型。二是再生材料加工技术有待加强：关键技术研发滞后，以动力电池回收利用为例，涉及多个交叉学科，工艺链复杂；再生材料质量控制体系不健全，缺乏严格的质量检测标准和检测设备。三是高值化应用水平较弱：产品附加值低，再生资源多用于低端产品（如废玻璃制建材），难以进入汽车、电子等高附加值产业链。</p>

<h4>三、国企破局思路</h4>
<p>对于资源循环利用产业链存在的痛点问题，国有企业可以根据自身优势禀赋选择从畅通上下游产业链、完善再生资源回收网络、增强技术研发和创新能力三个方面做重点突破：</p>
<ul>
  <li><strong>畅通上下游产业链：</strong>联动上下游企业，自有产业链向后延伸。关键成功要素：信息共享（如上中下游需求匹配）、资源整合（如纵向或横向供应链整合）</li>
  <li><strong>完善再生资源回收网络：</strong>构建正向回收网络，建立逆向回收体系。关键成功要素：政策支持（如废弃物处置特许经营权）、渠道运营（如回收基础设施、线上回收平台）</li>
  <li><strong>增强技术研发和创新能力：</strong>攻克加工处理核心技术。关键成功要素：研发投入（如研发资金和技术人才）、技术进步（如核心工艺突破、高值化利用技术）</li>
</ul>

<h3>第三部分 如何布局资源循环产业</h3>

<h4>路径一：联动上下游企业</h4>
<p>通过并购重组、合资合作联动产业的上下游企业，形成稳定合作网络，构建集废物回收、分解、加工、利用、无害化处理等为一体的循环再生利用产业体系。盈利模式：规模经济带来的成本降低、中间环节减少的价差收益。</p>
<p><strong>【案例】昆山城建绿和</strong>——昆山城建绿和环境科技有限公司成立于2018年6月，注册资本1.41亿元，是一家致力于建筑垃圾规范化处置、资源化利用及资源再生利用技术研发的高新技术企业。采用"市政特许经营+市场化产品开发"双轮驱动模式。股东结构：昆山城投61% + 江苏绿和33% + 昆山交通6% = "政策-技术-物流"铁三角。昆山城投推动政府将建筑垃圾处置纳入市政公共服务目录，提供特许经营权；江苏绿和将常州基地成熟的建筑垃圾处理工艺优化移植，主导编制再生产品应用的地方标准；昆山交通整合运收车辆构建"1小时收运圈"。目前已累计处置建筑垃圾292万吨，资源化利用率95%以上，共节约3万吨标准煤，减少50万吨碳排放量，节约174万吨天然砂石和539万亩土地。</p>

<h4>路径二：自有产业链向后延伸</h4>
<p>从既有的制造产业链向后端的资源回收和资源化利用延伸，进而将原材料作为生产环节原材料，打通"制造-回收-资源化利用"的生产回收再利用闭环。盈利模式：产业链协同带来的成本节约、市场控制力增强。</p>
<p><strong>【案例】优湃能源</strong>——优湃能源科技（广州）有限公司成立于2023年3月，注册资本18.61亿元，由广汽集团全资控股。致力于构建"锂矿+基础锂电池原材料生产+电池生产+储能及充换电服务+电池租赁+电池回收和梯次利用"纵向一体化的新能源产业链布局。电池生产方面，广汽集团和优湃能源已投资100多亿元，建设规划产能36GWh的因湃电池智能生态工厂。2023年11月与南网储能子公司签订战略合作协议，围绕电池银行投资、换电站业务、虚拟电厂项目、电池梯次和回收利用四方面展开合作。2024年4月与格林美集团合资成立广州优美再生技术有限公司（一期总投资1.9亿元），具备动力电池回收拆解能力2万吨/年、电池黑粉循环再生产能1万吨/年。</p>

<h4>路径三：构建正向回收网络</h4>
<p>在城乡各区域合理布局标准化回收站点、智能回收箱和废弃物转运中心。盈利模式：再生资源销售收入、政策补贴收益。</p>
<p><strong>【案例】爱回收·爱分类</strong>——万物新生集团旗下的城市绿色产业链业务，在全国38座城市铺设2.8万台智能回收机，建立了"点-站-场"三级回收体系。前端：在居民小区、大学、办公室等场景按300户/台放置智能回收设备，居民微信扫码投递获取积分可提现。中端：设备满柜后传感器通过物联网发送数据到运力平台，调度人员就近取回，袋子上有二维码可全程追溯。后端：通过半自动流水线进行40个以上品类的精细化分拣（其中塑料分为17类），以上海杨浦集散场为例，每天最大可分拣180吨可回收物，当天或隔天出货。</p>

<h4>路径四：建立逆向回收体系</h4>
<p>依托生产企业的销售网络，以售后维修再制造为核心，对废旧物资进行回收。盈利模式：再生资源销售收入、废弃物处置服务费、政策补贴收益。</p>
<p><strong>【案例】格力再生资源</strong>——格力通过整合全国28省市的3万家销售门店和30万安装和售后团队，建立逆向物流回收体系。逆向物流系统依托现有销售物流系统，在地区销售公司定期向下级运输格力电器货物的同时，增加回收下级废旧电器的模块，节省了大量物流成本。推出"明珠绿环回收"专业化回收平台。已在六大地区建立再生资源环保处理厂，累计处理各类废弃电器电子产品超4000万台。</p>

<h4>路径五：攻克加工处理核心技术</h4>
<p>加大对废弃物资源循环利用产业在分选、拆解、加工、再生材料高附加值利用等各环节关键技术研发投入力度，提升资源回收和加工利用的技术和装备水平。盈利模式：技术授权收费、高溢价产品。</p>
<p><strong>【案例】个旧圣比和</strong>——个旧圣比和实业有限公司创建于2001年，位于云南省个旧市，是上市公司深圳市超频三科技股份有限公司的控股子公司，国家专精特新"小巨人"企业，亦是国内最早进入锂离子电池材料领域研究、生产和销售的高新技术企业之一。拥有"废旧锂离子电池材料综合回收利用 → 前驱体 → 碳酸锂 → 正极材料"完整产业链技术。核心技术包括：废旧电极材料的预处理工艺技术、有价金属高效浸出工艺技术、浸出液高选择性湿化学杂质分离工艺技术、柔性三元前驱体生产工艺技术、碳酸锂回收工艺技术等。</p>

</div>
`;

// ==================== BACK TO TOP ====================
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        btn.classList.toggle('visible', window.scrollY > window.innerHeight);
        ticking = false;
      });
      ticking = true;
    }
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
