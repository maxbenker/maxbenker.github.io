---
layout: post
title: Writing a thesis in LaTeX - part 1
date: 2022-10-30 19:00:00
description: A minimal working example
tags: LaTeX
categories: research

---
In this article I will share lessons learned about writing a thesis in LaTeX. When I wrote my PhD thesis, I put a lot of effort into collecting information about how to write a thesis from the internet and from my colleagues at the TUM, which was quite time consuming. Probably everyone, who decides to write a thesis in LaTeX, has to go through this process but maybe I can spare you some effort by sharing my favorite LaTeX features in a series of shorter blog posts. 

First of all, I have to state that I am not a LaTeX expert, at all, and a very exhaustive guide for writing a thesis in LaTeX can be found [here](http://tug.ctan.org/info/dickimaw/dickimaw-thesis.pdf). Nevertheless, I can imagine that some of the routines and packages I ended up using are useful for others, too. In a series of shorter blog posts I will share them. This first part we will establish a minimal working example (i.e., a very basic LaTeX thesis document) that the following blog posts will be based upon. Hence, the content will be

1. An [exemplary LaTeX project and folder structure](#project-structure)
2. The [`main.tex`](#document-structure) file
3. [Integrating references](#bibtex-and-zotero) with `bibtex` and `Zotero`
4. Some useful, [additional packages](#additional-packages) and the [title page](#titlepage) of a thesis

But before we start, why should you chose LaTeX in the first place?

## Why LaTeX?

According to [this answer](https://tex.stackexchange.com/a/1760) on stackexchange using LaTeX is recommended if you want your documents to be of high typographical quality (i.e., beautiful), have a lot of mathematical expressions in your document or just want to separate the content from the format of your document (i.e. if you do not want to waste time thinking about how the document looks but rather what its content is).

Personally, I found that writing large documents in LaTeX is more stable than writing it with a what-you-see-is-what-you-get (WYSIWYG) text editor such as Word or [LibreOffice](https://www.libreoffice.org/). For me large texts are more difficult to control in WYSIWYG editors (e.g., I change something on page 4 and that change has negative impacts on the format of the following pages) and I also prefer the typographical quality of LaTeX.

However, since LaTeX is not a proprietary software, there are different distributions and ways to install and use it. Below, an exemplary way of working with LaTeX on a Windows computer is explained.

## LaTeX installation and text editor

I wrote my thesis using a [`MikTeX`](https://miktex.org/) distribution together with the [`TeXstudio`](https://www.texstudio.org/) text editor. The following examples are based on this setup. In case you have not installed the software, yet, install [`MikTeX`](https://miktex.org/) first and install [`TeXstudio`](https://www.texstudio.org/) afterwards.

There are other LaTeX distributions for other operation systems, such as `TeX Live` and `MacTeX`. Alternatively, you can write LaTeX documents online using [`overleaf`](https://www.sharelatex.com/), for example. You can find further information about the different possibilities to use LaTeX on the website of the [LaTeX project](https://www.latex-project.org/get/)

## Project Structure

The structure of the project folder `thesis` looks like this and can be downloaded as a zipped version [here](/downloads/thesis - MWE.zip): 

{% highlight tex %}
{% raw %}
thesis
│   main.tex
│   refs.bib     
│
└───source
│   │   introduction.tex
│   │   results.tex
│   │   conclusions.tex
│   │   appendix.tex
│   
└───figures
    │   jamesWebb.png
{% endraw %}
{% endhighlight %}

The folder has two files (the main LaTeX file `main.tex` and `refs.bib`, which holds the references) and two folders (`source` and `figures`) which contain four LaTeX files and one picture, respectively. The content of the main LaTeX file files and the bib file will be discussed below.

## Document Structure

In the `main.tex` file, the preamble of the thesis is defined and the single chapters, that are stored in the `source` folder, are integrated. The code looks like this:

{% highlight tex %}
{% raw %}
\documentclass[
paper=a4, % change to a5 if needed
pagesize=auto, 
fontsize=11pt, 
numbers=noendperiod,
headings=twolinechapter, % state the chapter first, then the chapter title
listof=totoc, % add listo of figures and tables to toc
bibliography=totoc % add bilbiography to toc
]
{scrbook}
% --------
% Bibliography
% --------
\usepackage[
style=authoryear, % other styles available
backend=biber, % you will have to set biber as your backend in TeXstudio
maxnames=2, % display maximum two authors
]
{biblatex}
\addbibresource{refs.bib} % tell latex where the references are stored
% --------
% Additional packages
% --------
\usepackage{lipsum} % for blind text only
\usepackage[hidelinks]{hyperref} % for internal links, such as Table of content (toc), figures and references
\usepackage{graphicx} % for the integration of figures
\graphicspath{{figures/}} % set absolute path to figures
\usepackage{booktabs} % for nicer tables
%
\begin{document}
% --------
% Ttilepage
% --------
\titlehead{Some University
		\hfill WS~2022/2023\\
	School of Something\\
	University Street 100\\
	12345 City}
\subject{Dissertation}
\title{Thesis Title}
\subtitle{Subtitle}
\author{John Doe}
\date{30. February 2022}
\publishers{\begin{tabular}{lll}
			&Chair: & Prof. A \\
			&First Examinor: & Prof. B\\
			&Second Examinor: & Prof. C
			\end{tabular}
			}
\dedication{Dedication}
\maketitle
% --------
% Preface
% --------
\frontmatter % switches to lower case roman page numbers
\tableofcontents
\listoffigures
\listoftables
% --------
% Content
% --------
\mainmatter % switches to latin page numbers
\include{source/introduction}
\include{source/results}
\include{source/conclusions}
% --------
% Appendix
% --------
\appendix%
\include{source/appendix}%
% --------
% Bibliography
% --------
\backmatter % chapters are not numbered anymore
\printbibliography%
\end{document}
{% endraw %}
{% endhighlight %}

The `main.tex` file integrates the single chapters with the `\include{<path/to/file.tex>}` command (e.g., `\include{source/introduction}`). It is best practice to split the document into several smaller LaTeX files and combine them in a main file. This avoids a single large and diffcult to handle document and can save you precious time when you want to compile only smaller parts of the thesis. Compiling the entire project results in the following document:
<p style="text-align: center;">
<object data="/latex/thesis - MWE/main.pdf" width="75%" height="500" type='application/pdf'></object>
</p>

### Document Class
Let's walk through the document step by step. First, the doument uses the `scrbook` documentclass provided by the [`Koma-script`](https://ctan.org/pkg/scrbook?lang=en) project. This is a pretty powerful template that has many of the handy things recommended for a thesis already implemented and is flexibly adjustable. In fact, the number of options the documentclass has can be overwhelming and this blog post will only focus on the very basic ones. 
{% highlight tex %}
\documentclass[
paper=a4, % change to a5 if needed
pagesize=auto, 
fontsize=11pt, 
numbers=noendperiod,
headings=twolinechapter, % state the chapter first, then the chapter title
listof=totoc, % add listo of figures and tables to toc
bibliography=totoc % add bilbiography to toc
]
{scrbook}
{% endhighlight %}
In the options many different aspects of the document can be defined, for example the paper size (`paper=a4`), the font size (`fontsize=11pt`) and whether period should follow after a chapter or section name (`numbers=noendperiod` disables this option). See the [`scrbook` documentation](https://ctan.org/pkg/scrbook?lang=en) for details.

### Bibtex and Zotero

The `bibtex` is a way to integrate references into the thesis document and automatically build a sorted bibliography at the end of the document. In order to use `bibtex` we integrate the package with:

{% highlight tex %}
\usepackage[
style=authoryear, % other styles available
backend=biber, % you will have to set biber as your backend in TeXstudio
maxnames=2 % display maximum two authors
]
{biblatex}
\addbibresource{refs.bib} % tell latex where the references are stored
{% endhighlight %}
This is also a powerful tool with many available options but we will only set a few: the style is set to `autoryear`, the backend, that actually generates the bibliography, is set to be `biber` (make sure to [set biber as your backend](https://tex.stackexchange.com/a/102864) in TeXstudio) and the et al. cut-off is set to three (i.e., a maximum of two names will be displayed for refereces in text). The content of `refs.bib` contains only two references and looks as follows:

{% highlight tex %}
@book{bishopPatternRecognitionMachine2006,
	title = {Pattern Recognition and Machine Learning},
	author = {Bishop, Christopher M.},
	year = {2006},
	series = {Information Science and Statistics},
	publisher = {Springer},
	address = {New York, NY},
	isbn = {978-0-387-31073-2},
	lccn = {Q327 .B52 2006}
}

@article{rumelhartLearningRepresentationsBackpropagating1986,
	title = {Learning Representations by Back-Propagating Errors},
	author = {Rumelhart, David E. and Hinton, Geoffrey E. and Williams, Ronald J.},
	year = {1986},
	journal = {Nature},
	volume = {323},
	number = {6088},
	pages = {533--536},
	issn = {0028-0836, 1476-4687},
	doi = {10.1038/323533a0},
	langid = {english}
}
{% endhighlight %}

This file can be created manually or automatically. Personally, I recommend using the free reference management software [Zotero](https://www.zotero.org/) for storing and organizing references. It strongly supports managing, reading and annotating references. When it comes to writing a thesis, the references can then automatically be exported to a bib file with the [Better BibTeX](https://retorque.re/zotero-better-bibtex/exporting/auto/) plugin for Zotero. It is even possible to automatically keep the bib file in sync with your Zotero collection, which even further simplifies writing a thesis.

In the document, we can cite the references from the bib file by their keys and the commands `\parencite{key}` and `\textcite{key}` commands. This is exemplarily shown in the introduction chapter with the `\parencite{bishopPatternRecognitionMachine2006}` and `\textcite{rumelhartLearningRepresentationsBackpropagating1986}` commands:

{% highlight tex %}
{% raw %}
\chapter{Introduction}%
\label{ch:introduction}%
An example for adding a reference in parenthesis \parencite{bishopPatternRecognitionMachine2006}. 
And one more example for a reference without parenthesis \textcite{rumelhartLearningRepresentationsBackpropagating1986}. 	

\lipsum%
%
\section{Motivation}%
\label{sec:motivation}%
\lipsum%
\begin{figure}
	\centering
	\includegraphics{jamesWebb}
	\caption[James Webb Stephan's Quintet]{Image of the Stephan's Quintet recorded by the James Webb telescope}
	\label{fig:jamesWebb}	
\end{figure}
%
\section{Objectives}%
\label{sec:objectives}%
\lipsum%
{% endraw %}
{% endhighlight %}

### Additional packages

Some additional packages are already integrated in the minimal working example:

{% highlight tex %}
\usepackage{lipsum} % for blind text only
{% endhighlight %}
is used for quickly adding blindtext, which can be deleted for a thesis, of course. In order to make links in the pdf work,
{% highlight tex %}
\usepackage[hidelinks]{hyperref} % for internal links, such as Table of content (toc), figures and references
{% endhighlight %}
is used. The `hidelinks` option makes the links only invisible, they are still there, however (feel free to compile with `\usepackage{hyperref}` to see the difference). For the integration of pictures in the document
{% highlight tex %}
{% raw %}
\usepackage{graphicx} % for the integration of figures
\graphicspath{ {figures/} } % set absolute path to figures
{% endraw %}
{% endhighlight %}
is used. By setting the path of the figures, LaTeX knows where to search for them. Finally,
{% highlight tex %}\usepackage{booktabs} % for nicer tables {% endhighlight %}
is used for nicer tables in our document.

### Titlepage

The last building block of the minimal working example is the titlepage. The `scrbook` already provides functionality that can be used. By setting the different variables below and adding the command `\maketitle`, the titlepage is generated automatically:
{% highlight tex %}
\titlehead{Some University
		\hfill WS~2022/2023\\
	School of Something\\
	University Street 100\\
	12345 City}
\subject{Dissertation}
\title{Thesis Title}
\subtitle{Subtitle}
\author{John Doe}
\date{30. February 2022}
\publishers{\begin{tabular}{lll}
			&Chair: & Prof. A \\
			&First Examinor: & Prof. B\\
			&Second Examinor: & Prof. C
			\end{tabular}
			}
\dedication{Dedication}
\maketitle
{% endhighlight %}
This is only basic functionalyity and you might want to design your own title page with a logo of your university. In that case you can use
{% highlight tex %}
\begin{titlepage}
% your custom title page here
\end{titlepage}
{% endhighlight %}

## Summary

At this point the first part of my lessons learned about writing a thesis in LaTeX comes to an end. To wrap up, the main takeways are
* LaTeX is a great alternative to a WYSIWYG editor for writing a thesis.
* By using a pre-defined document class such as [`scrbook`](https://ctan.org/pkg/scrbook?lang=en) one can quickly start writing a thesis in LaTeX.
* LaTeX integrates nicely with the free referece management software [Zotero](https://www.zotero.org/) and enables a smooth and easy worklfow for adding references.

In the [next part](/blog/2022/LaTeX-Thesis-Lessons-Learned-Part-2/) we will look at further LaTeX packages that make writing a thesis in LaTeX even more convenient. 