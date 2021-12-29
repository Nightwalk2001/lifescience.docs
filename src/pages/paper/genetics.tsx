import type {NextPage} from "next"

const Genetics: NextPage = () => {
  return <div className={"flex flex-col items-center w-3/4 mx-auto prose"}>
    <h1 className={"text-center"}>面容识别预测新生儿的遗传性疾病</h1>
    <text className={"self-start font-semibold bg-gradient-to-r from-sky-400 to-purple-500 gradient"}>
      2019级生物技术二班 王志威
    </text>
    <p><strong>摘要：</strong>许多患有染色体缺陷病的新生儿，如果能及早发现并辅以遗传治疗，具有不可估量的意义，如果想凭肉眼判断幼儿是否患有遗传缺陷病，往往需要丰富的经验，要让人信服又需要足够的资历，而具有丰富经验资历的医生是一个较小的群体，在理想情况下，深度学习在图像识别上可以达到99%以上的准确率，有望作为一个很好的辅助判断工具。
    </p>
    <p className={"self-start"}><strong>关键词：</strong>深度学习 图像识别 染色体缺陷病 儿童疾病 遗传治疗</p>

    {/*<div className={"w-full h-[1px] bg-gray-300 my-10"}/>*/}

    <p className={"indent-[2em]"}>
      机器学习是人工智能中最重要也是最主要的一个子集，结合数学、信号处理、计算机科学、生物学等诸多技术，数学为机器学习提供理论基础，主要研究如何得到更高的准确率、更高效的算法、如何避免拟合过度、梯度消失、梯度回退等问题。信号处理主要研究如何强化特征和降低噪音，计算机科学则实现数学和物理研究得到的算法，同时力图优化运算速度、探索更优的分布式计算方案。深度学习中最重要的算法，神经网络在许多地方借鉴了生物的神经元，全连接神经元灵感来于人神经系统，卷积的灵感来自于猫的神经系统，再比如注意力模型等。
    </p>
    <p className={"indent-[2em]"}>
      机器学习现在最热门的是深度学习和强化学习，深度学习擅长提取特征即做分类，强化学习擅长作决策，其中深度学习使用神经网络思考。下面分别介绍密集神经网络和卷积神经网络。密集神经网络是如下结构，也称为全连接神经元，第一层和最后一层分别是输入层和输出层。中间每一层称为隐藏层，我们处理过的数据会流过一个个隐藏层，就像经过一个个加工车间一样，第一个车间给将布料缝合起来，接下来一个个车间做熨烫、印花、剪线头、加吊牌、包装等等工作，最终得到一件商品衣服。连续两层间的两个神经元间的关系是简单的线性关系，即y=w1X1+w2X2+b，其中Xi是前一层神经元的值，wi是权重，y是下一层神经元的值，b是偏置值，可以增强表现力。
    </p>
    <img src={"/layer.png"} width={400} height={250} alt={""}/>
    <p className={"indent-[2em]"}>
      神经网络本质上是在做分类问题，或说聚类。上面说到，每两个神经元间的关系是简单的线性关系，当影响因素很少的时候或说类别很少的时候，我们可以用简单的线性关系来分类，但当数据量急剧上升、影响因素数量急剧增多，简单的线性关系就很难甚至不可能完成任务了，此时我们引入非线性关系，在每一个y上面作用一个函数，称为激活函数，处于计算复杂度考虑，这几个都是非常简单的函数。
    </p>
    <img src={"/active-fn.png"} width={600} height={300} alt={""}/>
    <p className={"indent-[2em]"}>
      当数据到了输出层后，会与真实值作比较，使用一个误差函数计算误差，如Mean Absolute
      Error、分类交叉熵等。误差自然是越低越好的。看下面这个图(并非实际训练中的误差变化图，但较适合解释梯度下降)，如果我们以训练次数作为x轴，误差作为y轴，那么把两个点的斜率连接起来，若其小于0，说明我们因该向右前进，若斜率大于0，说明应该向做前进，我们可以以此返过头去更新前面神经元的权重和偏置值，神经元自行小幅度调整权值和偏置，观察误差的运动方向并进一步做出改变，称为反向传播。有个形象的例子，一个人在满是浓雾的山上，想找到下山的路，那么他可以看哪边的路在上升哪边在下降，朝着下降的方向前进就可以了。
    </p>
    <img src={"/fn.png"} width={500} height={380} alt={""}/>
    <p className={"indent-[2em]"}>
      如果上面的神经网络，隐藏层数量很多，五层十层几百层乃至上千层，就成为了深度神经网络，也就是深度学习。深度学习中最重要的是卷积神经网络(Convolutional Neural Network,
      CNN)。卷积神经网络从局部认知数据，我们先看下从全局感知事务的缺陷，想象这种情况，模型看到了很多张证件照，因为证件照都是正对镜头的，那么当这种图片被旋转、缩放、平移，那么模型就不认识它了，因为它只认识这个整体，而从局部来认知，就不会有这些问题了，它看到一个与眼睛相似的部分、与鼻子相似的部分等等，那么可以推测，这是一个面部图。另一种常见的深度神经网络——循环神经网络(Recurrent
      Neural Network,
      RNN)早已被历史所淘汰，而CNN至今是最重要的深度神经网络，是Transformer、ResNet等前言技术的核心组件。下面简单介绍CNN，CNN的简单结构如下图，后面的全连接层就是上面介绍的密集神经网络层，前面的卷积-降采样层可以认为是一个隐藏层分成了两个。
    </p>
    <img src={"/cnn.png"} width={500} height={200} alt={""}/>
    <p className={"indent-[2em]"}>
      在具体介绍前，我们先解释图像是一种什么样的数据，任何图像都可以认为是一个数字矩阵，如果是一张黑白照片，把黑色色素点看作0，白色色素点看作1，那么黑白照片就是0-1矩阵，对彩图来说，因为任何颜色都是由red-green-blue三种颜色混合成的，所以每一个像素点都是一个三维向量，例如(16,134,228)，每一个维度都是介于0-255的值，所以彩图可以看作块矩阵的矩阵，可以分为三张矩阵，分别是red、green、blue三个维度的，对这三个维度分别计算再合并起来，可以简化运算。
    </p>
    <p className={"indent-[2em]"}>
      卷积是一个数学和物理学信号处理中的泛函，经过这种处理后，图像会得到平滑模糊和边缘强化的效果。神经网络中是这样的行为，以一个个卷积核，也称为过滤器，通常是一个2x2到4x4的矩阵，其中的元素就是可训练参数，卷积核从图像最左上角扫描到右下角，每一次扫描把卷积核与图像矩阵作点积运算，得到一个数值，我们使用一个window，通常是2x2或者3x3，在特征图上移动，每次移动距离称为步长，通常是1或者2。此外，为了照顾到图片的边缘部分，我们在图像周围填充0，通常是两圈。这样，在卷积结束后，我们得到了许多由一个个相关性组成的特征图，数量与卷积核数量相同。然后我们应用上面激活函数图里有的RelU激活函数，将负值标准化为0。
    </p>
    <img src={"/conv.png"} width={400} height={260} alt={""}/>
    <p className={"indent-[2em]"}>
      容易想象的是，卷积完成得到的矩阵远比原来的矩阵要大，因为卷积核往往有很多个，而且这个矩阵中有许多的无用元素即噪音——举个例子，我们使用卷积核与一个区域计算相关性，那么结果里面的大部分的都很接近0，毕竟一个图里到处都是特征是不合理的。如果不做任何处理，随着经过几百上千个卷积层，矩阵的维数将爆炸，并且几乎没有特征点。所以我们引入池化技术，我们再使用一个window，通常是2x2或者3x3，在特征图上移动，每次移动距离称为步长，通常是2，我们只取矩阵中最大的值或者平均值等。这样我们去除了噪音，强化了特征信号，并可以预防过度拟合。这里解释一下拟合不足和过度拟合，前者就像高中刷题刷少了，没摸到套路，后者就像把题目死记硬背下来了，在考试中吗，都不会有好结果。
    </p>
    <img src={"/pooling.png"} width={400} height={300} alt={""}/>
    <p className={"indent-[2em]"}>
      在浅层卷积里面，我们可以看到一些边缘，随着卷积层加深，我们可以看到眼睛、耳朵等特征，层数再加深就可以看到完整的面部等特征了。
    </p>
    <img src={"/many-layer.jpg"} width={400} height={210} alt={""}/>
    <p className={"indent-[2em]"}>
      经过所有的卷积层后，会来到全连接层，就是前面所介绍的神经网络了，它最终会输出一个向量，举个例子，如果是猫狗图像识别，最后就会输出一个二维向量，例如(0.9,0.1)，那么代表模型认为这张图有0.9的概率是第一种动物，至于哪个是第一种，这个是由你事先输入的，例如["dog",
      "cat"]，那么这里就是说有90%的概率是狗。同样的，训练的时候，每次都会根据误差去调整前面的卷积核以及全连接层的权重和偏置。
    </p>
    <p>
      至此原理部分就讲完了，基于CNN做图像识别，在有足够的数据集的情况下，我们可以训练出一个准确率足够高的model，对适合年龄的幼儿的面部照片进行分辨，鉴定是否患有染色体缺陷病，然而需要注意的是，深度学习不是完全可信的，虽然误差可以控制在1%以内，但还是要结合人的经验判断和基因检测，以提供确切的结果。
    </p>
  </div>
}

export default Genetics
