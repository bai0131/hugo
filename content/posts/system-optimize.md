---
title: "系统优化"
date: 2026-05-22T17:44:24+08:00
draft: false
tags: ["系统优化", "CS2", "教程"]
categories: ["技术"]
author: "Xinle Bai"
---

我将用最简单最直接的语言告诉你如何优化自己的系统，以及CS2（Counter-Strike 2）的简单优化。优化包括FPS帧数，延迟响应，提升帧率，提高手感。

软件链接放在文章末尾，以下设置仅供参考，具体以个人为主。

## 系统基础设置

### 系统安装

不管是win10还是win11系统，最好选择专业版

![image1](/posts/system-optimize/image1.png)

### 系统设置

首先是电脑最基本最简单的设置，win+i键打开设置

窗口化游戏优化打开，硬件加速GPU计划打开，

![image2](/posts/system-optimize/image2.png)

选择cs2.exe，GPU首选项选择高性能

![image3](/posts/system-optimize/image3.png)

关闭游戏模式

![image4](/posts/system-optimize/image4.png)

在下面搜索框搜索：调整windows的外观和性能（影响美观，可调可不调，我没调）

![image5](/posts/system-optimize/image5.png)

打开Windows安全中心，设备安全性，内核隔离里的内存完整性，选择关闭

### 英伟达显卡设置

#### 显卡驱动

不要下载最新的驱动，去抖音上搜显卡型号，找到用的人最多的版本，从浏览器上下载

#### 英伟达控制面板

![image6](/posts/system-optimize/image6.png)

![image7](/posts/system-optimize/image7.png)

这里选显卡

![image8](/posts/system-optimize/image8.png)

调整桌面尺寸和大小如果显示器很便宜就选gpu，如果显示器在2000块钱以上可以选显示

![image9](/posts/system-optimize/image9.png)

上面这些操作都是最基础最简单的

## 进阶优化

### 电源计划

电源计划对电脑影响非常非常非常大，直接用我的电源计划就可以，自己从网上找教程怎么导入。

### Boosterx调试

里面有很多调试的东西，比如上面那个电源计划你都懒得导入的话，可以在里面选择电源计划导入，但如果要做到更好，还是用我的那个电源计划。里面的精简系统设置根据自己的需要来选择禁用，包括设备的禁用和组件，根据自己的需要去禁用，可以从网上找教程参考，每个人的需求都不一样，有的组件别人用不到，然后选择禁用了，但你不一定用不到。

### WiseCare

#### 系统清理

![image10](/posts/system-optimize/image10.png)

#### 系统优化

![image11](/posts/system-optimize/image11.png)

### dism++

#### 系统优化

![image12](/posts/system-optimize/image12.png)

还有一个软件叫Process Lasso，调游戏线程cpu核心的，教程操作可以从网上找一下

## 鼠标键盘响应

### 注册表修改

#### 后台与前台的响应优先级

Win+r打开运行，输入regedit打开注册表，按地址步骤打开，修改为0

![image13](/posts/system-optimize/image13.png)

#### 鼠标响应速度

计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\PriorityControl

![image14](/posts/system-optimize/image14.png)

#### 键盘响应速度

计算机\HKEY_CURRENT_USER\Control Panel\Keyboard

KeyboardDelay（重复延迟）改成0，Speed（重复速度）改成40

![image15](/posts/system-optimize/image15.png)

键盘敏感度QueueSize，最高值16，觉得快的每次+2往上调，16+2=18,18+2=20...

![image16](/posts/system-optimize/image16.png)

### 鼠标加速度

打开控制面板，切换小图标，找到鼠标，指针选项，把提高指针精准度去掉（不打对勾）

![image17](/posts/system-optimize/image17.png)

## 游戏设置

### 游戏内设置

游戏最高fps，追求平均帧的，在控制台输入fps_max 0，不锁帧，追求low帧高的，可以锁300或400

![image18](/posts/system-optimize/image18.png)

![image19](/posts/system-optimize/image19.png)

修改cs2_video文件，提高游戏优先级

打开5e或完美，找到cfg设置，打开本地cfg目录，找到cs2_video文本文档，把这三个改成0，默认是3，然后ctrl+s保存，退出

![image20](/posts/system-optimize/image20.png)

这样修改游戏里的画面设置之后好像会自动改回去，可以在这个路径下新建一个autoexec.cfg文件，记事本打开，写入：

```
mat_video_mem_level "0"
mat_video_cpu_level "0"
mat_video_gpu_level "0"
```

这三句，然后保存，这个优先级更高，就算后面cs2_video里面的改回去了，autoexec.cfg也会强制性把CPU，GPU，显存这些设回0

![image21](/posts/system-optimize/image21.png)

### 清理着色器缓存

1. 搜索磁盘清理，选择c盘，勾选DirectX着色器缓存，点清理系统文件，点确定

![image22](/posts/system-optimize/image22.png)

![image23](/posts/system-optimize/image23.png)

2. 在steam里右键CS2，然后点击管理浏览本地文件，点击game然后点击core，随后删掉shaders开头的四个文件，接着回到CS2属性点击已安装文件，点击验证游戏文件的完整性，等待四个着色器文件被重新下载。

![image24](/posts/system-optimize/image24.png)

3. 使用WIN+R打开运行框，输入steam://open/console打开steam控制台，接着在steam控制台输入shader_build 730来重建着色器。

![image25](/posts/system-optimize/image25.png)

---

调机器不能让你的4060变成5090，只是最大限度的发挥你的机器性能，提高响应速度，让电脑提升5%，硬件更新才是真的提升。

软件链接：https://pan.quark.cn/s/7a4cd2a60ac2
