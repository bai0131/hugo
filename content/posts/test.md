---
title: "V3 博客渲染能力全方位测试"
date: 2026-05-01T14:30:00+08:00
draft: false
tags: ["Hugo", "测试", "Debug"]
categories: ["建站日志"]
---



> 经历了无数次 404 和 Vercel 权限报错，这篇文章用于测试 Markdown 的各项基本语法在当前主题下的渲染效果。



\## 1. 文本排版测试



这是一段普通的正文测试。平时写技术博客经常会用到\*\*重点加粗\*\*，或者是标记一些\*专用名词的斜体\*，当然还有表示废弃方案的~~删除线文本~~。



\## 2. 代码高亮测试



作为核心功能，必须测试一下代码块的语法高亮是否正常：



```java

// 随便写段 Java 

public class BlogTest {

&nbsp;   public static void main(String\[] args) {

&nbsp;       String status = "Success";

&nbsp;       System.out.println("Hello,  Blog! 网站：" + status);

&nbsp;   }

}

