---
title: "Markdown 渲染能力测试"
date: 2026-05-01
categories: [software]
summary: "这篇日志用来验证博客的 Markdown 引擎（marked.js）是否正常工作，包含标题、列表、代码块、引用等常用语法。"
layout: "single"
---

## 为什么选择 Markdown

Markdown 是一种**轻量级标记语言**，它允许我们使用纯文本格式编写文档，然后转换成结构化的 HTML。对于技术博客来说，它有以下几个优点：

- 语法简单，专注于内容本身
- 代码块支持语法高亮
- 可以嵌入 HTML
- 被 GitHub、Stack Overflow 等平台广泛支持

## 代码示例

下面是一段 Java 代码：

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Bai's Blog!");
    }
}
```

再来看一段 JavaScript：

```javascript
const greet = (name) => {
  console.log(`你好，${name}，欢迎来到我的技术博客。`);
};

greet('访客');
```

## 引用块测试

> 「代码就像是写给人看的，顺带能在机器上运行。」
> — Harold Abelson

## 总结

技术博客的**核心价值**在于：

1. 记录自己的学习轨迹
2. 帮助他人解决同样的问题
3. 在写的过程中加深理解

写好一篇技术文章，比写一百行注释更有意义。
