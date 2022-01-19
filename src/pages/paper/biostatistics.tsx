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
import usa from "@/json/us-state.json"
import usaConfirmed from "@/json/us_confirmed.json"
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
  <h1 className={"!mt-12 text-center"}>新型冠状病毒肺炎（COVID-19）地域、年龄与性别差异研究——基于COVID-19数据的分析与可视化
  </h1>
  <text className={"self-start font-semibold"}>
    王志威-19331144 梁靖雯-18323052 陈娟-19331010
  </text>
  <p><strong>摘要：</strong>许多患有染色体缺陷病的新生儿，如果能及早发现并辅以遗传治疗，具有不可估量的意义，如果想凭肉眼判断幼儿是否患有遗传缺陷病，往往需要丰富的经验，要让人信服又需要足够的资历，而具有丰富经验资历的医生是一个较小的群体，在理想情况下，深度学习在图像识别上可以达到99%以上的准确率，有望作为一个很好的辅助判断工具。
  </p>
  <p className={"self-start"}><strong>关键词：</strong>COVID-19 数据可视化 神经网络</p>
  <h4 className={"self-start"}>1 方法</h4>
  <p className={"self-start"}>
    我们使用的数据来自Kaggle（www.kaggle.com），包括全球每日新增确诊人数/死亡人数、各国每日新增人数/死亡人数以及印度、美国等几个国家更为详细的病患记录等。本论文主要进行的是数据可视化，采用了线性相关等统计学分析手段和神经网络进行新增确诊人数的预测。其中数据可视化采用的是在Next.js（基于React.js的静态生成/服务端渲染框架）中使用底层SVG
    API（rect、circle、path等），同时结合D3.js（Data Driven
    Document）的工具函数进行图表绘制，动画效果使用了framer-motion的工具函数，统计学分析和神经网络部分采用Python的pandas、SciPy、TensorFlow2等包或库。
  </p>
  <h4 className={"self-start"}>2 结果</h4>
  <h5 className={"self-start"}>2.1 COVID-19传播的地域差异</h5>

  <CovidLineTrend/>
  <p className={"self-start"}>
    以全球各国COVID-19的累计确诊病例数作趋势图，可见在本文统计的时间范围内美国、印度和巴西为累计确诊病例最多的三个国家，其累计确诊病例数分别为33251939、27894800、16471600。美国自2020年4月起累计确诊病例数量增长速度加快，趋势线与其余各国分离，于2020年11月至2021年2月表现最大增长趋势。印度与巴西的累计确诊病例数量于2020年6月起增长速度加快，印度在2021年4月至5月表现最大增长趋势。
  </p>
  <Code code={`
      data.leaves().map((d, i) => {
        const w        = d.x1 - d.x0,
              h        = d.y1 - d.y0,
              xm       = (d.x0 + d.x1) / 2,
              ym       = (d.y0 + d.y1) / 2,
              ybw      = w < h * 0.9,
              fontSize = Math.max(9, 0.22 * (ybw ? w : h))

        return <g
          key={i}
          className={"cursor-pointer"}
          onMouseEnter={(event) => handleMouse(event, d)}
          onMouseMove={(event) => handleMouse(event, d)}
          onTouchStart={(event) => handleMouse(event, d)}
          onTouchMove={(event) => handleMouse(event, d)}
          onMouseLeave={() => setTooltip(null)}
        >
          <motion.rect
            animate={{
              width: [0, inView ? d.x1 - d.x0 : 0],
              height: [0, inView ? d.y1 - d.y0 : 0],
              transition: {duration: 0.01, delay: i * 0.0102}
            }}
            x={d.x0}
            y={d.y0}
            fill={color((d.parent.data as any).name)(d.value)}
            fillOpacity={0.9}
            stroke={"#fdf7f7"}
            strokeWidth={1}
          />
          {d.value > 1000000 &&
            <text
              fontSize={fontSize}
              fontWeight={500}
              textAnchor={"middle"}
              fill={"#fff"}
            >
              {(d.data as any).name}
            </text>}
        </g>
      })
  `}/>

  <CovidGeo geoFeature={geoWorld} meshes={worldMeshes} data={worldConfirmed} regionName={"国家/地区"}/>
  <p className={"self-start"}>
    以截止至2021年5月的COVID-19累计确诊病例数作全球COVID-19累计确诊地理图（图？）。其中美国、印度累计确诊病例数量远高于其他国家/地区，因此单独作图（图？），不在本图中显示。
    由全球COVID-19累计确诊地理图可见，COVID-19累计确诊病例数量较多的国家主要集中在欧洲和美洲，而亚洲、非洲及大洋洲COVID-19感染者数量相比欧美较少。欧美国家中除美国外，欧洲的俄罗斯、法国和土耳其以及美洲的阿根廷和哥伦比亚累计确诊病例最多，均已突破300万，显示目前COVID-19主要流行于欧洲及美洲，确诊病例数量高，COVID-19传播形势较为严峻。而亚非国家中仅印度尼西亚和南非共和国确诊病例数突破100万，显示亚非国家对COVID-19传播的控制略优于欧美国家。
  </p>
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
  <p className={"self-start"}>
    将美国COVID-19累计确诊病例数量以州为单位作地理图（图？），可见加利福尼亚州（State of California）、得克萨斯州（State of Texas）、佛罗里达州（State of
    Florida）及纽约州（State of New
    York）COVID-19确诊病例数量居于全美前位，各州确诊人数均突破200万，其余各州确诊病例多数也已超10万，高于我国累计确诊的总和（9.8万）。美国确诊病例数量最高的各州均为经济较发达的地区，提示美国COVID-19疫情流行的地理差异可能与经济、人口存在关联，但此非本文研究关注点，因此不对其展开相关性分析。
  </p>

  <CovidGeo geoFeature={geoIndia} meshes={indiaMeshes} data={indiaConfirmed} regionName={"州/省"}
            tooltipColor={"#fab47b"}/>
  <p className={"self-start"}>
    将印度COVID-19感染者数量以邦为单位作地理图（图？），其中马哈拉施特拉邦（Maharashtra State）、卡纳塔克邦（Karnataka）、喀拉拉邦（Kerala）以及泰米尔纳德邦（Tamil
    Nadu）感染者数量最多，均超过200万。与美国COVID-19流行的地理差异相似，印度同样表现经济发达地区COVID-19确诊病例数量高的特征。
  </p>

  <CovidScatterDensity/>
  <p className={"self-start"}>
    以2020年5月23日的各国新增确诊人数为x轴，该国人口密度为y轴作散点图，每点为一个国家/地区，点面积大小表示该国人口数量。该日统计得大部分国家/地区确诊人数低于2千人，且人口密度较小，集中于近原点区域，提示人口数量和人口密度均较小的国家/地区COVID-19传播能力较弱。而也有部分国家/地区人口密度较高而人口数量小，当日确诊人数也低于2千人，散点表现沿y轴分布。此外还有部分散点沿x轴分布，即部分国家/地区当日确诊人数高于2千人，这部分国家/地区的人口密度大多不超过600
    pop/平方公里（有一南美国家人口密度约1200 pop/平方公里），其中部分散点表示的国家/地区的人口数量较大，显示人口数量大的国家/地区有着更高的COVID-19确诊人数。
  </p>

  <h5 className={"self-start"}>2.2 全球COVID-19新增与死亡病例统计</h5>
  <CovidLineDaily/>
  <p className={"self-start"}>
    由全球单日新增病例与单日死亡病例作曲线图，并以周均新增或死亡数作曲线反映新增和死亡病例数量的变化趋势（图？）。由于新增与死亡病例数量级差距较大，因此采用双纵坐标将两者组合以便比较病例增长趋势，左纵坐标为单日新增病例数，右纵坐标为单日死亡病例数。由新增病例数曲线可见，全球单日新增病例在2020年3月小幅度上升，随后呈较缓上升趋势，2020年10月出现一次大幅度上升，此后呈震荡上升趋势，期间在2021年1月出现一次较大幅度的下降，然而2021年2月后单日新增病例再次回升。单日新增病例在本文统计的时间段内呈现震荡上涨的趋势，2020年12月单日新增病例数一度达到近150万例的峰值。由死亡病例数曲线可见，2020年4月死亡病例急剧增加，之后逐渐震荡回落，与单日新增病例数增长趋势接近，2020年10月也出现大幅上升，此后周均死亡病例曲线趋势与周均新增病例数趋势接近，但稍滞后于新增曲线。
    使用皮尔逊相关系数（Pearson Correlation Coefficient）对单日新增病例和单日死亡病例进行相关性分析。相关系数r为0.8707（{`P<0.0001`}），提示两者之间存在极显著的正相关关系，可认为单日新增病例曲线与单日死亡病例曲线的趋势相似。
  </p>
  <h5 className={"self-start"}>2.3 COVID-19传播中的年龄与性别差异</h5>
  <p className={"self-start"}>
    由于各国报告的COVID-19感染的性别和年龄数据完整度存在差异，部分国家未同时报告COVID-19确诊病例的性别和年龄信息，因此无法对全球COVID-19感染的性别和年龄差异展开分析。本文选用韩国报告的COVID-19确诊病例的性别和年龄数据进行分析。韩国COVID-19确诊病例中，男性：女性的比例为0.45
    : 0.55，总体而言女性患者病例高于男性。将确诊病例年龄以10岁为一组分组，以年龄段为横轴，确诊人数为纵轴分性别作柱形图（图？）。
  </p>
  <CovidAgeDistribution/>
  <p className={"self-start"}>
    就年龄结构而言，韩国COVID-19确诊病例以中青年（20～59岁）为主，少年儿童及老年人在确诊病例中占比较低。韩国COVID-19男性确诊病例中，20s（20～29岁）患者占比最高，为25.67%；30s（30～39岁）患者其次，占比16.39%。女性确诊病例中，同样以20s患者占比最高，为22.1%；50s（50～59岁）患者其次，占比19.54%。提示不同性别间确诊病例的年龄结构存在差异。
    此外，低于40岁的患者中男性较多，仅在20s组男性患者以约10人的差距低于女性患者，而其余组的男性患者数量高于女性患者。而在40岁及以上的患者中，女性患者的数量均高于男性患者，且在40s和50s的患者中差距最大。显示青少年患者中男性居多，而中老年患者中女性居多。
  </p>

  <CovidTreemap/>
  <h5 className={"self-start mt-5"}>2.5 COVID-19每日新增确诊预测</h5>
  <p className={"self-start"}>
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
  <p className={"self-start"}>
    首先导入keras的各个工具类。然后构建model，第一层为一维卷积层，卷积核数量设置为64个，卷积核矩阵尺寸设为5x5，步长设置为3，激活函数使用relU函数，然后是多层LSTM与Dropout的组合，Dropout可以很好地防止过拟合，最后接入单个神经元地密集层，导出输出结果。
  </p>
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
  <p className={"self-start"}>
    接下来编译和训练model，损失函数选用MSE，优化器函数使用Adam，将训练集按4：1拆分部分为验证数据集，以批大小为64训练100个来回，由于数据为时间序列数据，打乱数据有很大影响，故将shuffle设置为False，每次训练结束调用两个回调函数，第一个用于逐渐降低学习率，第二个用于防止过拟合，当损失值连续10次没有下降甚至上升时，提前终止训练。
  </p>
  <p className={"self-start"}>
    使用训练好的model预测未来数据，然后与真实值比较，结果如下图，可以看到，预测结果地趋势基本与真实值保持一致，但预测值较实际值偏大，说明model还有优化空间。
  </p>
  <CovidFuture/>

  <h4 className={"self-start"}>
    参考文献
  </h4>
</div>

export default biostatistics
