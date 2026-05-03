---
title: "Antigravity Windows 完全部署与网络避坑指南"
date: 2026-05-02T03:00:00+08:00
draft: false
tags: ["Antigravity", "网络配置", "极客指南", "AI"]
categories: ["技术"]
author: "Bai"
---

## 一、前置要求
- 具备可访问 Google 的网络环境（“魔法”），自行准备。
- 拥有正常的 Gemini Pro 账号（免费账号可能不可用，403、被封禁的账号无法使用，港区/大陆账号需特殊处理）。

---

## 二、安装辅助登录工具 Cockpit Tools
1. 访问 [Cockpit Tools Releases](https://github.com/licodes99/cockpit-tools/releases)
2. 下载最新版 `Cockpit.Tools_x.x.x_x64-setup.exe`（点击 `Show all assets` 查看全部文件）
3. 若浏览器或 SmartScreen 拦截，选择“保留”或“仍要运行”
4. 安装过程全部点击 Next，安装完成后先不打开。

---

## 三、网络配置（三种方式，任选其一）

### 方式 A：仅系统代理 + antigravity-proxy（推荐，但可能需重复配置）
**优点**：无需 Tun 模式  
**缺点**：Antigravity 更新后可能失效，卡顿则换用方式 B 或 C  
1. 下载 [antigravity-proxy](https://github.com/yuaotian/antigravity-proxy/releases) 最新版 `antigravity-proxy-vx.x-win-x64.zip`
2. 解压除 `使用说明.md` 外的两个文件到 **Antigravity 根目录**  
   - 找根目录：开始菜单 → 右键 Antigravity → 打开文件位置 → 再次右键 → 打开文件位置
3. **“魔法”设置**：
   - 关闭 Tun（虚拟网卡）模式，**仅开启系统代理**
   - 代理规则必须选 **“规则”**（非全局/直连）
4. 配置 `config.json`：
   - 打开 Antigravity 根目录下的 `config.json`
   - 端口：Clash for Windows 默认 `7890`，Clash Verge 改为 `7897`，其他软件查看系统代理设置中获取端口（设置 → 网络和 Internet → 代理 → 手动代理设置 → 端口）
   - 类型：通常 `socks5`，若无效尝试 `http` 或 `https`

### 方式 B：Tun 模式（备用方案）
1. 使用 Clash Verge 等客户端，**开启 Tun（虚拟网卡）模式，关闭系统代理**，规则选“规则”
2. 确保已安装 Tun 驱动（如未安装，点击相关按钮安装，网络问题可先开其他魔法再装）
3. 重启魔法软件，确认 Google 可正常访问
4. **若使用方式 A 则跳过此步**，此步为最后保障

### 方式 C：ProxyBridge（替代方案，优先于方式 B）
1. 下载 [ProxyBridge](https://github.com/InterceptSuite/ProxyBridge/releases) 最新 `.exe` 安装
2. 打开软件 → Settings → 语言改为中文
3. 左上角“代理” → “代理设置”，填入魔法端口（查看方法同方式 A），测试成功后保存
4. 右上角“代理” → “代理规则” → 添加：
   - 浏览选择 Antigravity 根目录下的 `Antigravity.exe`
   - 再添加 `Antigravity\resources\app\extensions\antigravity\bin\language_server_windows_x64.exe`
   - 保存即可

---

## 四、正式登录流程
1. 打开 **Cockpit Tools**，界面左下角改语言为中文（如需要）
2. 左侧找到 Antigravity 图标，点击中央“添加账号”或蓝色加号
3. 点击“开始 OAuth 授权”，弹出网页登录你的 Google 账号
4. 授权成功后账号出现在列表中，点击对应账号的**播放按钮**，等待 Antigravity 启动即登录成功。

---

## 五、SSH 连接配置
1. 下载 SSH 代理插件：访问 [antigravity-ssh-proxy](https://open-vsx.org/extension/dinobot22/antigravity-ssh-proxy)，点击 Download
2. 在 Antigravity 中，左侧扩展 → 将下载的插件文件拖入安装
3. 底部出现绿色 **ATP** 按钮，点击设置魔法端口并保存（用于方式 A/C；若用方式 B 需同时打开系统代理，连接成功后关闭系统代理）
4. 在 SSH 连接的 Antigravity 窗口中，进入扩展 → 在“SSH:XXX 中安装扩展”处为 `Antigravity SSH Proxy` 安装，然后关闭窗口重新连接即可。

---

## 六、常见问题与解决
| 问题现象 | 原因/解决方法 |
|---------|--------------|
| 右侧对话框加载不出来 | 点击“Open Agent Manager”按提示操作，直至出现红色停止按钮，完全关闭 Antigravity 后重新直接打开（勿通过 Cockpit Tools） |
| 模型加载不出来 | 网络配置错误或账号被封，多为网络问题 |
| 对话报错，右下角蓝色 “Retry” | 账号被禁或之前使用 Antigravity Tools 登录，换用 Cockpit Tools |
| 对话右下角蓝色 “Complete XXX” | 需手机验证：点击按钮 → 选第二项 → 国家选 +86，输入手机号验证（次数过多换号） |
| 强制清除本地缓存 | 按 `Ctrl + Shift + P` → 输入 `Antigravity: Reset onboarding` → 退出账号重新登录 |

---

## "连接的本质是协议的博弈。"