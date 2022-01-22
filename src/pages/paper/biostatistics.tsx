import {
  CovidAgeDistribution,
  CovidFuture,
  CovidGeo,
  CovidLineDaily,
  CovidLineTrend,
  CovidScatterDensity,
  CovidTreemap
} from "@/charts"
import world from "@/json/global.json"
import worldConfirmed from "@/json/global_confirmed.json"
import india from "@/json/india.json"
import indiaConfirmed from "@/json/india_confirmed.json"
import usa from "@/json/usa.json"
import usaConfirmed from "@/json/usa_confirmed.json"
import {Code} from "@/widgets"
import type {NextPage} from "next"
import * as topojson from "topojson-client"

const geoWorld = topojson.feature(world as any, (world as any).objects.global)
const worldMeshes = topojson.mesh(world as any, (world as any).objects.global, (a, b) => a !== b)
const geoUsa = topojson.feature(usa as any, (usa as any).objects.states)
const usaMeshes = topojson.mesh(usa as any, (usa as any).objects.states, (a, b) => a !== b)
const geoIndia = topojson.feature(india as any, (india as any).objects.states)
const indiaMeshes = topojson.mesh(india as any, (india as any).objects.states, (a, b) => a !== b)

const biostatistics: NextPage = () => <div
  className={"flex flex-col items-center min-w-[900px] max-w-[80%] mx-auto prose"}>
  <h1 className={"!mt-12 text-center"}>新型冠状病毒肺炎（COVID-19）地域、年龄与性别差异研究——基于COVID-19数据的分析、可视化与预测
  </h1>
  <text className={"font-semibold"}>王志威 梁靖雯 陈娟</text>
  <text className={"font-semibold"}>(中山大学生命科学学院，广东省广州市，510275）</text>
  <p><strong>摘要：</strong>2019年底，出现的严重急性呼吸综合征冠状病毒2（SARS-CoV-2）引发了大规模的全球疫情，是一个重大的公共卫生问题。为研究新型冠状疫情传播的地域差异、确诊人数和死亡病例的增长趋势，一些国家确诊数量的增长趋势、以及确诊病例的年龄与性别差异等，我们采用在Next.js中使用底层SVG
    API（rect、circle、path等），同时结合D3.js（Data Driven
    Document）的工具函数进行数据可视化和图表绘制，使用framer-motion制作动画效果，并使用Python的pandas、SciPy、TensorFlow2等包或库进行统计学分析和深度学习。
  </p>
  <div className={"self-start"}><strong>关键词：</strong>COVID-19;数据可视化；统计学分析；深度学习；性别差异；地域差异</div>
  <h1 className={"!mt-12 text-center"}>
    Regional, age and gender differences in COVID-19—Analysis and visualization based on COVID-19 data
  </h1>
  <text className={"font-semibold"}>Zhiwei Wang, Jingwen Liang, Juan Chen</text>
  <text className={"font-semibold"}> (School of Life Sciences, Sun Yat-sen University Guangzhou 510275)</text>
  <p><strong>Abstract:</strong>The emergence of severe acute respiratory syndrome coronavirus 2 (SARS-COV-2) in late
    2019 caused a massive global outbreak and was a major public health concern. To study regional differences in the
    spread of the novel coronavirus, the increasing trend of the number of confirmed cases and deaths, as well as
    differences in age and gender of confirmed cases, We used the underlying SVG API (rect, Circle, path, etc.) in Next.
    Js, combined with tool functions of D3.js (Data Driven Document) for Data visualization and chart drawing, and used
    Framer-Motion to produce animation effects. Statistical analysis was performed using Python packages or libraries
    such as PANDAS, SciPy, and TensorFlow2. The results show that from January 2020 to May 2021, the transmission of
    COVID-19 is geographically different, with the number of confirmed cases increasing faster in the United States,
    India, Brazil and other countries, and the trend line is separated from the rest of the countries. Statistics on new
    and deaths from COVID-19 worldwide show that the trend of single-day new cases is similar to that of single-day
    deaths. Based on the confirmed cases in South Korea, the prevalence of COVID-19 varies by age and sex. We analyzed
    the results and discussed the causes of regional, age and gender differences in COVID-19.
  </p>
  <div className={"self-start"}><strong>Keywords: </strong>COVID-19; data visualization; statistical analysis;machine
    learning; gender difference; regional disparity
  </div>
  <h4 className={"self-start"}>引言：</h4>
  <div className={"self-start indent-[2em]"}>
    2020年3月11日，世界卫生组织宣布由严重急性呼吸系统综合征引起的2019年新型冠状病毒肺炎（COVID-19）冠状病毒2（SARS-CoV-2）为新的流行病，在短时间内引发了全球疫情，截至2022年1月，全球确诊病例逾3.3亿。SARS-CoV-2与人的SCE2受体具有很强的相互作用，跨膜丝氨酸蛋白酶2（TMPRSS2）参与其细胞进入[1]。
  </div>
  <div className={"self-start indent-[2em]"}>
    在轻度肺炎患者中，大部分症状是发热、咳嗽、呼吸道感染和头痛等，他们没有表现出严重的症状和并发症；而重症肺炎患者患有急性呼吸窘迫综合征（ARDS）和难治性低氧血症。COVID-19可引起严重的肺部感染，呼吸衰竭，以及器官损伤和功能障碍，在肺外系统功能障碍的情况下，会出现血液和消化系统紊乱，脓毒症和脓毒性休克的症状，增加了死亡率[2]。
  </div>
  <div className={"self-start indent-[2em]"}>
    先天性和适应性免疫都会被SARS-CoV-2感染激活。除了免疫细胞募集之外，单核细胞的感染在疾病的后期还会导致大规模的炎症反应，这些炎症免疫反应可能导致局部和全身组织损伤[3]。大部分重度患者表现出“细胞因子风暴”，其机制是受感染产生的细胞因子招募肺泡巨噬细胞，这反过来增加血管通透性，招募免疫系统的其他成分并启动急性期反应。受感染细胞死亡引起的组织损伤和通过免疫细胞杀死的细胞引起肺泡水肿，导致缺氧。先天性和适应性免疫反应的过度激活诱导细胞因子风暴[4]。
  </div>
  <div className={"self-start indent-[2em]"}>
    在新冠感染病例中，男性似乎比女性更容易感染SARS-CoV-2，男性死于感染的可能性比女性高65%，世界卫生组织和中国的数据显示，在所有把病例中，感染该病毒的女性死亡率约1.7%，而男性为2.8%[5]，在香港医院的数据显示，32%的男性和15%的女性感染者会导致重症或死亡，这证明了女性比男性具有更强的先天性和适应性免疫反应，并且对病毒感染的抵抗力更高，参与免疫反应的X连锁基因的拷贝数的差异以及男性和女性中的疾病易感性基因的存在可能解释这种性别优势。同时也有研究表明，由于社会、心理、职业原因、环境因素和生活方式等因素，冠状病毒对女性的长期影响可能比男性更加严重[6]。无论得到哪种结论，我们都需要考虑某些中心点。此外，研究表明在婴儿和儿童感染者中出现轻微症状，且无性别差异，但严重程度随着年龄的增长而恶化，可能由于免疫反应失调，或者凝血系统和内皮功能障碍随着年龄的增长而变得不平衡[6]。
  </div>
  <div className={"self-start indent-[2em]"}>
    因此为了研究新冠疫情传播的地域差异，我们对2020年1月至2021年4月全球的确诊病例做了可视化分析，同时以新增确诊人数和死亡病例作图观察其增长趋势；对几个典型国家的确诊病例做趋势图，针对确诊数量增长快速的国家进行讨论；除此之外，我们选用韩国报告的COVID-19确诊病例的性别和年龄数据进行分析，探求新型冠状病毒肺炎在生存方面的性别差异程度。
  </div>
  <h4 className={"self-start"}>1 方法</h4>
  <p className={"self-start indent-[2em]"}>
    我们使用的数据来自Kaggle（www.kaggle.com），包括全球每日新增确诊人数/死亡人数、各国每日新增人数/死亡人数以及印度、美国等几个国家更为详细的病患记录等。本论文主要进行的是数据可视化，采用了线性相关等统计学分析手段和神经网络进行新增确诊人数的预测。其中数据可视化采用的是在Next.js（基于React.js的静态生成/服务端渲染框架）中使用底层SVG
    API（rect、circle、path等），同时结合D3.js（Data Driven
    Document）的工具函数进行图表绘制，动画效果使用了framer-motion的工具函数，统计学分析和神经网络部分采用Python的pandas、SciPy、TensorFlow2等包或库。
  </p>
  <h4 className={"self-start"}>2 结果</h4>
  <h5 className={"self-start"}>2.1 COVID-19传播的地域差异</h5>

  <CovidLineTrend/>
  <p className={"self-start indent-[2em]"}>
    以全球各国COVID-19的累计确诊病例数作趋势图，可见在本文统计的时间范围内美国、印度和巴西为累计确诊病例最多的三个国家，其累计确诊病例数分别为33251939、27894800、16471600。美国自2020年4月起累计确诊病例数量增长速度加快，趋势线与其余各国分离，于2020年11月至2021年2月表现最大增长趋势。印度与巴西的累计确诊病例数量于2020年6月起增长速度加快，印度在2021年4月至5月表现最大增长趋势。
  </p>


  <CovidTreemap/>
  <p className={"self-start indent-[2em]"}>
    为显示各国确诊病例数量及比例，以截止至2021年5月30日的累计确诊病例数量分大洲作树图（图1B）。由树图可见美国、印度与巴西确诊病例数量最高，分别在各大洲的确诊病例总数中占有较大比例。欧洲多国累计确诊病例超百万，确诊病例在欧洲各国分布较均匀，非洲确诊病例则主要集中在南非共和国。就各大洲确诊病例数量而言，亚洲和欧洲确诊病例数相近，美洲（包括南美洲与北美洲）在全球总确诊病例中占比最大。
  </p>

  <CovidGeo geoFeature={geoWorld} meshes={worldMeshes} data={worldConfirmed} regionName={"国家/地区"}/>
  <div className={"self-start indent-[2em] mt-5"}>
    为将各国确诊病例数量与地理位置结合显示，以截止至2021年5月的COVID-19累计确诊病例数作全球COVID-19累计确诊病例地理图（图1C）。其中美国、印度累计确诊病例数量远高于其他国家/地区，因此单独作图（图1D-E），其确诊病例数量不在本图中显示。
  </div>
  <div className={"self-start indent-[2em] mb-5"}>
    由全球COVID-19累计确诊地理图可见，COVID-19累计确诊病例数量较多的国家主要集中在欧洲和美洲，而亚洲、非洲及大洋洲COVID-19感染者数量相比欧美较少。欧美国家中除美国外，欧洲的俄罗斯、法国和土耳其以及美洲的巴西、阿根廷和哥伦比亚累计确诊病例最多，均已突破300万，亚非国家中确诊病例数量以印度为首，印度尼西亚、南非共和国其次。总体而言目前COVID-19主要流行于欧洲及美洲，确诊病例数量高，COVID-19传播形势较为严峻。欧美确诊病例分布特点有有所不同，欧洲多国均有较高（{`>100万`}）的确诊病例，而美洲的确诊病例主要集中于美国，与其余国家有数量级上的差距。
  </div>
  <CovidGeo
    width={950}
    height={620}
    geoFeature={geoUsa}
    meshes={usaMeshes}
    data={usaConfirmed}
    useProjection={false}
    showLegend={false}
    regionName={"州/省"}
    tooltipColor={"#57d7ec"}
  />
  <p className={"self-start indent-[2em]"}>
    将美国COVID-19累计确诊病例数量以州为单位作地理图（图1D），可见加利福尼亚州（State of California）、得克萨斯州（State of Texas）、佛罗里达州（State of
    Florida）及纽约州（State of New
    York）COVID-19确诊病例数量居于全美前位，各州确诊人数均突破200万，其余各州确诊病例多数也已超10万，高于我国累计确诊的总和（9.8万）。美国确诊病例数量最高的各州均为经济较发达的地区，提示美国COVID-19疫情流行的地理差异可能与经济、人口存在关联，但此非本文研究关注点，因此不对其展开相关性分析。
  </p>

  <CovidGeo geoFeature={geoIndia} meshes={indiaMeshes} data={indiaConfirmed} regionName={"州/省"}
            tooltipColor={"#fab47b"}/>
  <p className={"self-start indent-[2em]"}>
    将印度COVID-19感染者数量以邦为单位作地理图（图1E），其中马哈拉施特拉邦（Maharashtra State）、卡纳塔克邦（Karnataka）、喀拉拉邦（Kerala）以及泰米尔纳德邦（Tamil
    Nadu）感染者数量最多，均超过200万。与美国COVID-19流行的地理差异相似，印度同样表现经济发达地区COVID-19确诊病例数量高的特征。
  </p>

  <CovidScatterDensity/>
  <p className={"self-start indent-[2em]"}>
    以2020年5月23日的各国新增确诊人数为x轴，该国人口密度为y轴作散点图（图1F），每点为一个国家/地区，点面积大小表示该国人口数量。该日统计得大部分国家/地区确诊人数低于2千人，且人口密度较小，集中于近原点区域，提示人口数量和人口密度均较小的国家/地区COVID-19传播能力较弱。而也有部分国家/地区人口密度较高而人口数量小，当日确诊人数也低于2千人，散点表现沿y轴分布。此外还有部分散点沿x轴分布，即部分国家/地区当日确诊人数高于2千人，这部分国家/地区的人口密度大多不超过600
    pop/平方公里（有一南美国家人口密度约1200 pop/平方公里），其中部分散点表示的国家/地区的人口数量较大，显示人口数量大的国家/地区有着更高的COVID-19确诊人数。
  </p>

  <h5 className={"self-start"}>2.2 全球COVID-19新增与死亡病例统计</h5>
  <CovidLineDaily/>
  <div className={"self-start indent-[2em] mt-5"}>
    由全球单日新增病例与单日死亡病例作曲线图，并以周均新增或死亡数作曲线反映新增和死亡病例数量的变化趋势（图2）。由于新增与死亡病例数量级差距较大，因此采用双纵坐标将两者组合以便比较病例增长趋势，左纵坐标为单日新增病例数，右纵坐标为单日死亡病例数。由新增病例数曲线可见，全球单日新增病例在2020年3月小幅度上升，随后呈较缓上升趋势，2020年10月出现一次大幅度上升，此后呈震荡上升趋势，期间在2021年1月出现一次较大幅度的下降，然而2021年2月后单日新增病例再次回升。单日新增病例在本文统计的时间段内呈现震荡上涨的趋势，2020年12月单日新增病例数一度达到近150万例的峰值。由死亡病例数曲线可见，2020年4月死亡病例急剧增加，之后逐渐震荡回落，与单日新增病例数增长趋势接近，2020年10月也出现大幅上升，此后周均死亡病例曲线趋势与周均新增病例数趋势接近，但稍滞后于新增曲线。
  </div>
  <div className={"self-start indent-[2em] mb-5"}>
    使用皮尔逊相关系数（Pearson Correlation Coefficient）对单日新增病例和单日死亡病例进行相关性分析。相关系数r为0.8707（{`P<0.0001`}），提示两者之间存在极显著的正相关关系，可认为单日新增病例曲线与单日死亡病例曲线的趋势相似。
  </div>
  <h5 className={"self-start"}>2.3 COVID-19传播中的年龄与性别差异</h5>
  <p className={"self-start indent-[2em]"}>
    由于各国报告的COVID-19感染的性别和年龄数据完整度存在差异，部分国家未同时报告COVID-19确诊病例的性别和年龄信息，因此无法对全球COVID-19感染的性别和年龄差异展开分析。本文选用韩国报告的COVID-19确诊病例的性别和年龄数据进行分析。韩国COVID-19确诊病例中，男性：女性的比例为0.45
    : 0.55，总体而言女性患者病例高于男性。将确诊病例年龄以10岁为一组分组，以年龄段为横轴，确诊人数为纵轴分性别作柱形图（图3）。
  </p>
  <CovidAgeDistribution/>
  <div className={"self-start indent-[2em] mt-5"}>
    就年龄结构而言，韩国COVID-19确诊病例以中青年（20～59岁）为主，少年儿童及老年人在确诊病例中占比较低。韩国COVID-19男性确诊病例中，20s（20～29岁）患者占比最高，为25.67%；30s（30～39岁）患者其次，占比16.39%。女性确诊病例中，同样以20s患者占比最高，为22.1%；50s（50～59岁）患者其次，占比19.54%。提示不同性别间确诊病例的年龄结构存在差异。
  </div>
  <div className={"self-start indent-[2em] mb-5"}>
    此外，低于40岁的患者中男性较多，仅在20s组男性患者以约10人的差距低于女性患者，而其余组的男性患者数量高于女性患者。而在40岁及以上的患者中，女性患者的数量均高于男性患者，且在40s和50s的患者中差距最大。显示青少年患者中男性居多，而中老年患者中女性居多。
  </div>


  <h5 className={"self-start mt-5"}>2.4 COVID-19每日新增确诊预测</h5>
  <p className={"self-start indent-[2em]"}>
    我们想要使用深度学习对新冠确诊人数这种时间序列数据进行预测，由于数据量不大，为避免过拟合，我们不采用Transformer，而使用Conv1D与LSTM构建神经网络。
  </p>
  <Code
    code={`
      from tensorflow.keras import Sequential
      from tensorflow.keras.layers import Conv1D, LSTM, Dropout, Dense
      from keras.callbacks import EarlyStopping, ReduceLROnPlateau
      
      model = Sequential([
          Conv1D(filters=64, kernel_size=5, strides=3, padding="causal", activation="relu", input_shape=(previous, 1)),
          LSTM(64, return_sequences=True),
          Dropout(0.4),
          LSTM(64, return_sequences=True),
          Dropout(0.4),
          LSTM(64),
          Dropout(0.2),
          Dense(1)
      ])
  `}
    height={400}
  />
  <div className={"self-start indent-[2em]"}>
    首先导入keras的各个工具类。然后构建model，第一层为一维卷积层，卷积核数量设置为64个，卷积核矩阵尺寸设为5x5，步长设置为3，激活函数使用relU函数，然后是多层LSTM与Dropout的组合，Dropout可以很好地防止过拟合，最后接入单个神经元地密集层，导出输出结果。
  </div>
  <Code
    code={`
      model.compile(loss='mse', optimizer='adam')
      
      learning_rate_reduction = ReduceLROnPlateau(monitor='val_loss',
                                                  patience=3,
                                                  verbose=1,
                                                  factor=0.8,
                                                  min_lr=1e-10)
      
      early_stop = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)
      
      history = model.fit(x_tranin,
                    y_train,
                    batch_size=64,
                    epochs=100,
                    validation_split=0.2,
                    shuffle=False,
                    callbacks=[learning_rate_reduction, early_stop]
                    )
    `}
    height={490}
  />
  <div className={"self-start indent-[2em]"}>
    接下来编译和训练model，损失函数选用MSE，优化器函数使用Adam，将训练集按4：1拆分部分为验证数据集，以批大小为64训练100个来回，由于数据为时间序列数据，打乱数据有很大影响，故将shuffle设置为False，每次训练结束调用两个回调函数，第一个用于逐渐降低学习率，第二个用于防止过拟合，当损失值连续10次没有下降甚至上升时，提前终止训练。
  </div>
  <div className={"self-start indent-[2em]"}>
    使用训练好的model预测未来数据，然后与真实值比较，结果如下图，可以看到，预测结果地趋势基本与真实值保持一致，但预测值较实际值偏大，说明model还有优化空间。
  </div>
  <CovidFuture/>

  <h4 className={"self-start"}>3 讨论</h4>

  <h5 className={"self-start my-5"}>3.1 COVID-19传播中地域差异的影响因素</h5>
  <div className={"self-start indent-[2em]"}>
    COVID-19在各大洲、各国之间显示流行病学上的异质性。这种差异的存在可能与其地理位置、COVID-19传入时间、对疫情的准备和应对措施、卫生系统的检测与治疗能力、疫苗接种情况、人口与遗传因素、气候环境因素、政治经济因素和社会因素有关[7]。
  </div>
  <div className={"self-start indent-[2em]"}>
    目前已有大量关于于COVID-19时空动态的研究，但多数以各国内部行政单位间COVID-19的传播差异为研究对象，而对全球COVID-19传播差异的研究较少，其原因可能是影响COVID-19流行的因素过于复杂，疾病的地理学纬度与历史、社会和空间、领土等一系列因素相关。根据相关研究，在COVID-19流行的早期阶段，其地理差异的出现主要以国家间交通和COVID-19传入时间有关[8]。目前已证明唯一能够有效防止COVID-19传播的措施是社会疏远、个人卫生、社会和国家封锁。然而由于人类的社会特性和世界、国家的经济影响，这种强硬的隔离措施并非长久之计[9]。开放国家间的交通势必将带来疫情传入的风险，各国间差异的另一影响因素是卫生系统的承载能力。确诊和死亡病例数的急剧增加往往出现在卫生系统崩溃之后，表明各国卫生系统承载力的差异可能是导致COVID-19流行早期地域差异的重要因素。以上因素验证了本文图1A中各国的累计确诊病例数在COVID-19流行早期各国确诊病例均较少且差异不显著，而自2020年6月后多个国家确诊病例数快速上升，各国COVID-19流行情况出现差异的情况。
  </div>
  <div className={"self-start indent-[2em]"}>
    而COVID-19大流行发展到后期，影响各国确诊和死亡病例数量的因素中，疫苗接种率和群体免疫的建立在其中有着重要的地位。广泛接受COVID-19疫苗以实现足够的免疫覆盖率，对结束COVID-19大流行有着重要意义。各国疫苗接种率的差异也已成为COVID-19流行地域差异的重要因素。有研究于2020年6月对COVID-19的潜在接受度了全球调查，在接受调查的19个国家的随机人群中，中国的接受率最高（90%）而俄罗斯的接受率最低（55%），对疫苗的接受度与对政府的信任、疫苗的研究进展与不良反应有关，接受度超80%的国家往往是对中央政府高度信任的国家，如中国、韩国，而巴西、印度和南非等中等收入国家的接受度也相对较高。研究同时表明各国之间疫苗覆盖率的差异可能是COVID-19全球大流行是否得到控制的重要影响因素[10]。自2020年12月起，COVID-19疫苗已经开始分发。目前的疫苗主要基于mRNA、腺病毒或减毒病毒，研究表明与发展中国家相比，发达国家有更多的机会获取疫苗，然而其接种率却低于预期，截止2021年2月15日，疫苗接种率仅达到2.5%[11]。而与发达国家相反，中低收入国家接种COVID-19疫苗的意愿高得多[12]，但由于疫苗的分配不均而导致中低收入国家无法获得与接受疫苗意愿相匹配的疫苗资源。这种状况为本文统计数据中巴西、印度等中等收入国家在COVID-19流行后期确诊病例数量的迅速增长提供了一方面的依据。
  </div>
  <div className={"self-start indent-[2em]"}>
    COVID-19的传播还与人类抗病毒免疫息息相关。有研究表明意大利人群的I类白细胞抗原（HLA）等位基因的区域流行可能是造成意大利COVID-19传播区域差异的原因，HLA-C*01和B*44等位基因与COVID-19传播存在潜在相关性[13]。该研究提示人群中HLA等位基因的多态性与COVID-19传播相关，研究结果或许可以拓展到更大的范围，如大洲或全球，成为解释COVID-19传播地域差异的一部分原因。
  </div>
  <h5 className={"self-start my-5"}>3.2 COVID-19传播的年龄与性别差异</h5>
  <div className={"self-start indent-[2em]"}>
    迄今为止，只有少数报告涉及COVID-19发病率和病程中的性别比例失调，目前缺乏对根本原因的彻底分析。已有研究表明男性和女性的病例数量相似，但是男性的病死率增加。然而并非所有国家都提供性别分列的数据，病例数和病死率因区域而异。性别差异的原因是多因素的，有免疫反应的差异、生理学差异、潜在并发症差异以及生活方式差异等。
  </div>
  <div className={"self-start indent-[2em]"}>
    在病毒感染期间，男性和女性对病毒的先天识别反应以及下游适应性免疫反应不同，通常情况下，女性对病毒感染的易感性降低，女性会比男性产生更强的免疫反应；同时，性腺类固醇的直接影响导致免疫功能的许多性别差异，性类固醇通过与特定受体结合来改变免疫细胞的功能[14]；除此之外，性别差异可能是由X和Y染色体上编码的基因表达的固有不平衡引起的，在X染色体上编码了几个免疫相关基因，并且有证据表明女性免疫细胞中X连锁基因的激活率高于男性[15]；编码免疫蛋白的性染色体和常染色体中的多态性也可能导致免疫反应的性别差异。除了上述性别之间免疫反应的差异，生物学差异，还有潜在并发症的差异。据报道，男性通常患有更多危及生命的疾病，如心血管疾病、高血压、糖尿病等，而女性往往患有更多的非致命性慢性疾病，如偏头痛、自身免疫疾病等[16]。然而男性和女性扮演者不同的社会角色，且男性和女性生活方式的差异也使得分析性别差异的因素变得困难。
  </div>
  <div className={"self-start indent-[2em]"}>
    在本文对韩国报告的COVID-19确诊病例的性别和年龄数据进行分析，确诊人数以20~59岁为主，大部分年龄段的女性确诊数量多于男性，这与其他国家的数据存在差异。造成韩国女性具有较高的易感性的原因可能是：受生理特性和社会性别规范影响，女性承担的包括生育、家务劳动和护理等家庭责任更重，可能会增加她们感染病毒的风险。然而由于样本数据太小，因此不能很好的解释男性女性间患病率的性别差异。
  </div>

  <h4 className={"self-start"}>4 结论</h4>
  <p className={"self-start indent-[2em]"}>
    本文基于由Kaggle获得的COVID-19病例数据，使用Next.js、D3.js、framer-motion和Python等工具对全球新增和死亡病例数据进行数据可视化处理，并采用线性相关等分析方法对数据进行处理，并使用神经网络进行新增确诊人数的预测。根据数据可视化处理结果描述全球累计确诊病例的分布与地域差异，显示美国、印度和巴西为数据统计时间内全球累计确诊病例最多的三个国家，各大洲内各国累计确诊病例分布存在差异。通过对全球每日新增和死亡病例数的可视化处理与相关性分析，得出新增和死亡病例呈现波动上升趋势，且两者之间存在极显著的正相关。通过对韩国确诊病例的年龄与性别分析，得出韩国确诊病例中总体女性感染COVID-19的比例更高，但青少年男性相比女性更易感染COVID-19的结论。最后我们使用机器学习建立模型对数据统计时间范围外全球COVID-19确诊人数进行了预测，训练模型显示其预测趋势与现有数据保持一致，但预测值较真实值偏大，提示该模型仍有待优化。
  </p>

  <h4 className={"self-start"}>参考文献</h4>
  <div className={"self-start font-ff"}>
    [1] Markus Hoffmann, Hannah Kleine-Weber, Simon Schroeder, Nadine Krüger, Tanja Herrler, Sandra Erichsen, Tobias S.
    Schiergens, Georg Herrler, Nai-Huei Wu, Andreas Nitsche, Marcel A. Müller, Christian Drosten, Stefan
    Pöhlmann,SARS-CoV-2 Cell Entry Depends on ACE2 and TMPRSS2 and Is Blocked by a Clinically Proven Protease
    Inhibitor,Cell,Volume 181, Issue 2,2020,Pages 271-280.e8,ISSN0092-8674. <br/>
    [2] Seyed Hosseini E, Riahi Kashani N, Nikzad H, Azadbakht J, Hassani Bafrani H, Haddad Kashani H. The novel
    coronavirus Disease-2019 (COVID-19): Mechanism of action, detection and recent therapeutic strategies. Virology.
    2020 Dec;551:1-9. doi: 10.1016/j.virol.2020.08.011. Epub 2020 Sep 24. PMID: 33010669; PMCID: PMC7513802. <br/>
    [3] Felsenstein S, Herbert JA, McNamara PS, Hedrich CM. COVID-19: Immunology and treatment options. Clin Immunol.
    2020;215:108448.
    [4] Anka, AU, Tahir, MI, Abubakar, SD, et al. Coronavirus disease 2019 (COVID-19): An overview of the
    immunopathology, serological diagnosis and management. Scand J Immunol. 2021; 93:e12998. <br/>
    [5] Dudley JP, Lee NT. Disparities in age-specific morbidity and mortality from SARS-coV 2 in China and the republic
    of Korea. Clin Infect Dis. 2020;71(15):863–5. <br/>
    [6] Gemmati, D.; Bramanti, B.; Serino, M.L.; Secchiero, P.; Zauli, G.; Tisato, V. COVID-19 and Individual Genetic
    Susceptibility/Receptivity: Role of ACE1/ACE2 Genes, Immunity, Inflammation and Coagulation. Might the Double
    X-Chromosome in Females Be Protective against SARS-CoV-2 Compared to the Single X-Chromosome in Males? Int. J. Mol.
    Sci. 2020, 21, 3474. <br/>
    [7] Tessema SK, Nkengasong JN. Understanding COVID-19 in Africa. Nat Rev Immunol. 2021 Aug;21(8):469-470. <br/>
    [8] Franch-Pardo I, Napoletano BM, Rosete-Verges F, Billa L. Spatial analysis and GIS in the study of COVID-19. A
    review. Sci Total Environ. 2020 Oct 15;739:140033. <br/>
    [9] Mantas J. The Importance of Health Informatics in Public Health During the COVID-19 Pandemic. Stud Health
    Technol Inform. 2020 Jun 26;272:487-488. <br/>
    [10] Lazarus JV, Ratzan SC, Palayew A, Gostin LO, Larson HJ, Rabin K, Kimball S, El-Mohandes A. Author Correction: A
    global survey of potential acceptance of a COVID-19 vaccine. Nat Med. 2021 Feb;27(2):354. <br/>
    [11] Thomas S. Status of COVID-19 Pandemic Before the Administration of Vaccine. Methods Mol Biol.
    2022;2410:93-108. <br/>
    [12] Solís Arce JS, Warren SS, Meriggi NF, et al. COVID-19 vaccine acceptance and hesitancy in low- and
    middle-income countries. Nat Med. 2021 Aug;27(8):1385-1394. <br/>
    [13] Correale P, Mutti L, Pentimalli F, Baglio G, Saladino RE, Sileri P, Giordano A. HLA-B*44 and C*01 Prevalence
    Correlates with Covid19 Spreading across Italy. Int J Mol Sci. 2020 Jul 23;21(15):5205. <br/>
    [14] Klein, S.L. (2012), Sex influences immune responses to viruses, and efficacy of prophylaxis and treatments for
    viral diseases. Bioessays, 34: 1050-1059. <br/>
    [15] Stamova B, Tian Y, Jickling G, Bushnell C, et al. 2011. The X-chromosome has a different pattern of gene
    expression in women compared with men with ischemic stroke. Stroke 43: 326– 34. <br/>
    [16] Ahrenfeldt, L.J., Otavova, M., Christensen, K. et al. Sex and age differences in COVID-19 mortality in Europe.
    Wien Klin Wochenschr 133, 393–398 (2021). <br/>
  </div>
</div>

export default biostatistics
