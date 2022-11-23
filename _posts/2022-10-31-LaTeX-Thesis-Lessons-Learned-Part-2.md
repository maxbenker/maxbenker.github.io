---
layout: post
title: Writing a thesis in LaTeX - part 2
date: 2022-11-05 20:00:00
description: Useful LaTeX packages, commands and hacks
tags: LaTeX
categories: research

---
In the [first part](/blog/2022/LaTeX-Thesis-Lessons-Learned-Part-1/) of this blog series, a minimal working example (MWE) of a LaTeX thesis project was derived. This MWE is rather basic and, therefore, this blog post will introduce additional commands and packages that enhance the quality of the document and make writing a thesis in LaTeX even more convenient. This blog post is about the following topics:

1. Introduction of useful commands and hacks:
    * [`\includeonly{<path/to/file.tex>}`](#compile-only-parts-of-a-document) for only compiling parts of the thesis which can significantly accelerate compilation. 
    * [automatically filter reference information](#automatically-filter-reference-information)
    * [avoiding so-called widows and orphans](#avoiding-widows-and-orphans) for nicer typesetting
2. Introduction of useful packages:
    * [`csquotes`](#csquotes) for citing text
    * [`siunitx`](#siunitx) for nice and flexible display of numbers with and without SI units
    * [`cleveref`](#cleveref) for better referencing to chapters, sections, figures and tables
    * [`enumitem`](#enumitem) for nicer enumerations and description lists

The final zipped LaTeX project can be downloaded [here](/downloads/thesis.zip).

## Commands

Below, a few commands (and hacks) that make life easier in LaTeX and produce nicer documents will be presented.

### Compile only parts of a document

When working on a thesis document, one usually does not write all chapters in parallel but rather one after another. Therefore, compiling the single chapter, that is currently being drafted, is often sufficient. This can be achieved by integrating the `\includeonly{<path/to/file.tex>}` command in the preable. For example, adding

{% highlight tex %}
{% raw %}
\includeonly{source/introduction.tex}
\begin{document}
{% endraw %}
{% endhighlight %}

to the preamble of the `main.tex` file from the [MWE derived in part 1](/blog/2022/LaTeX-Thesis-Lessons-Learned-Part-1/) of this blog series, leads to only compiling the introduction and the following pdf:

<p style="text-align: center;">
<object data="/latex/thesis/main.pdf" width="75%" height="500" type='application/pdf'></object>
</p>

It can be seen that only Chapter 1 Introduction is compiled and the other chapters are ignored. In large LaTeX documents this can save a lot of compile time and accelerate the process of writing significantly.

### Automatically filter reference information

In the [MWE from part 1](/blog/2022/LaTeX-Thesis-Lessons-Learned-Part-1/), two references were integrated, that end up being listed in the bibliography (see the pdf viewer above). It can be seen that the reference entry for the Nature paper by Rumelhart et al. has an ISSN and DOI. The first is the international serial number of the nature journal and the latter is the digital object identifier of the article. In order to find the reference, the DOI is sufficient in this case. The ISSN of the journal is not a necessary information and can be deleted.

In contrast, the other reference entry, which is a book by Bishop, has an ISBN, which is a necessary information for finding and matching the reference.

Usually, we do not want redundant or unnecessary information in the bibliography. There are two ways of handling this: first, the ISSN of the paper by Rumelhart et al. can be deleted from the bib file manually:

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
	doi = {10.1038/323533a0},
	langid = {english}
}
{% endhighlight %}

Since the information is missing, `bibtex` cannot print it in the bibliography. With a long list of references, deleting unnecessary information can be cumbersome and a source of mistakes, however.

A second and automatic way of handling the issue is to define filters for the entire bibliography in the preamble of the `main.tex` file:

{% highlight tex %}
{% raw %}
% filter the bib entries by adding the following code to the preamble
\DeclareSourcemap{
\maps[datatype=bibtex]{
	% remove fields that are always useless
	\map{
		\step[fieldset=abstract, null]
		\step[fieldset=pagetotal, null]
		\step[fieldset=month, null]
	}
	% remove URLs for types that are primarily printed
	\map{
		\pernottype{software}
		\pernottype{online}
		\pernottype{report}
		\pernottype{techreport}
		\pernottype{standard}
		\pernottype{manual}
		\pernottype{misc}
		\step[fieldset=url, null]
		\step[fieldset=urldate, null]
	}
	\map{
		\pertype{inproceedings}
		\pertype{article}
		% do not show ISBN or ISSN for proceedings and journal papers
		\step[fieldset=isbn, null]
		\step[fieldset=issn, null]
	}
	\map{
		\pertype{book}
		\pertype{inbook}
		\pertype{incollection}
		% do not show DOI for books
		\step[fieldset=doi, null]
	}
}
}
\begin{document}
{% endraw %}
{% endhighlight %}

Note, that the bibliography has to be re-compiled first (in TeXstudio: Tools > Bibliography (F8)). This will lead to the ISSN not being printed for the paper by Rumelhart et al. in the bibliography, any more. 

Additionally, the command above will remove the fields `abstract`, `pagetotal` and `month` for all types of references, the fields `url` and `urldate` for references which are usually printed, such as standards and manuals, and remove the field `doi` for books, that should have an ISBN. 

### Avoiding widows and orphans

Sometimes, LaTeX produces a document with so-called widows and orphans. According to [this Wikipedia article](https://en.wikipedia.org/wiki/Widows_and_orphans), a widow is "a paragraph-ending line that falls at the beginning of the following page [...]" and an orphan is "a paragraph-opening line that appears by itself at the bottom of a page [...]". Such widows and orphans are considered unaesthetic and should be avoided.

On pages 2 and 5 of the MWE, there are indeed widows, which can be avoided by adding the following penalties to the preamble of `main.tex` (more information about LaTeX penalties can be found [here](https://tex.stackexchange.com/a/51264)).

{% highlight tex %}
{% raw %}
% avoid widows and orphans by setting in the preamble:
\widowpenalty=100000
\clubpenalty=100000
\displaywidowpenalty=100000
\begin{document}
{% endraw %}
{% endhighlight %}

Now, the widows on pages 2 and 5 do not appear anymore. This is rather a hack than a command, but this worked nicely for avoiding widows and orphans in my thesis document and at, the same time, did not cause problems elsewhere.

## Packages

Having introduced some handy commands, the remainder of this blog post will introduce additional packages that come with useful features and can enhance a LaTeX thesis document.

### [`csquotes`](https://ctan.org/pkg/csquotes?lang=en)

This package provides advanced functionalities for displaying quotes. After adding it to the preamble (i.e., `\usepackage{csquotes}`), the command

{% highlight tex %}
{% raw %}
\enquote{A simple and short quote.}
{% endraw %}
{% endhighlight %}

can be used to produce a simple inline quote. In contrast, the command 

{% highlight tex %}
{% raw %}
\blockquote[\cite{bishopPatternRecognitionMachine2006}, p.~1]{The problem of searching for patterns in data is a fundamental one and has a long and successful history. For instance, the extensive astronomical observations of Tycho Brahe in the 16th century allowed Johannes Kepler to discover the empirical laws of planetary motion, which in turn provided a springboard for the development of classical mechanics. Similarly, the discovery of regularities in atomic spectra played a key role in the development and verification of quantum physics in the early twentieth century. The field of pattern recognition is concerned with the automatic discovery of regularities in data through the use of computer algorithms and with the use of these regularities to take actions such as classifying the data into different categories.}
{% endraw %}
{% endhighlight %}

produces a larger block quote which is clearly separated from the rest of the text. See section 1.3 of the [pdf displayed above](#compile-only-parts-of-a-document) for examples.

### [`siunitx`](https://ctan.org/pkg/siunitx?lang=en)

This is one of my favorite packages as it standardizes the quantities and units in the entire document. After integrating it in the preamble (i.e., `\usepackage{siunitx}`), all quantities can be defined using `\qty{<number>}{<unit>}`. For example,

{% highlight tex %}
{% raw %}
\qty{12.5}{\meter\per\second\squared}
{% endraw %}
{% endhighlight %}

will result in $$ 12.5\hskip .25em \text{m}\hskip .25em\text{s}^{-2} $$. If you look closely, this is different from standard $$12.5\enspace\text{ms}^{-2}$$. Using `siunitx`, a [middle space](https://en.wikipedia.org/wiki/Quad_(typography)) is added between th number and the unit, instead of an en quad space. 

If the units should be displayed differently (e.g., $$\text{m/s}^2$$ instead of $$\text{m}\hskip .25em\text{s}^{-2}$$), this is easily adjustable in the options of `siunitx`. Just change the code to

{% highlight tex %}
{% raw %}
\qty[per-mode = symbol]{9.81}{\meter\per\second\squared}
{% endraw %}
{% endhighlight %}

If this should be changed in the entire document for all quantities, the preamble can be adjusted to

{% highlight tex %}
{% raw %}
\usepackage[per-mode = symbol]{siunitx}
{% endraw %}
{% endhighlight %}

Note, how handy this can be. When writing the thesis, one can ignore the format of the unis and decide in the end, which format all units should have. 

Further features include ranges of quantities and list of quantities. See section 1.4. of the [pdf displayed above](#compile-only-parts-of-a-document) for examples. I recommend to check out the [documentation](https://ctan.org/pkg/siunitx?lang=en) for the SI unit names and prefixes in tables 1-6.

### [`cleveref`](https://ctan.org/pkg/cleveref?lang=en)

In a thesis, we usually want to cross-reference to chapters, sections, figures, tables and maybe even single pages. This can be automated with the `cleveref` package. After including it in the preamble (i.e., `\usepackage{cleveref}`), the `cref{<label>}` command is available. For example,

{% highlight tex %}
{% raw %}
The introduction to this thesis is given in \cref{ch:introduction}.
{% endraw %}
{% endhighlight %}

is compiled to 

"The introduction to this thesis is given in chapter 1."

in the compiled document. The only prerequisite is that the cross-referenced object needs a label. In this case chapter 1 has a label defined directly after its declaration in `introduction.tex`:

{% highlight tex %}
{% raw %}
\chapter{Introduction}%
\label{ch:introduction}%
{% endraw %}
{% endhighlight %}

See more examples in section 1.5 of the [pdf displayed above](#compile-only-parts-of-a-document) and check out the [documentation](https://ctan.org/pkg/cleveref?lang=en) for further details.

### [`enumitem`](https://ctan.org/pkg/enumitem?lang=en)

The last package I recommend using is the `enumitem` package which provides control over the layout of the three basic list environments: enumerate, itemize and description. Hence, it enables also custom labels.

For example, the following code defines a list of items with custom labels "L" followed by an arabic number starting at 1:

{% highlight tex %}
{% raw %}
\begin{enumerate}[leftmargin=*,start=1,label={\bfseries L\arabic*}]%
	\item \lipsum[0-1]
	\item \lipsum[0-1]
	\item \lipsum[0-1]
\end{enumerate}
{% endraw %}
{% endhighlight %}

See the outcome in section 1.6 of the [pdf displayed above](#compile-only-parts-of-a-document) and also check out the [documentation](https://ctan.org/pkg/enumitem?lang=en) for further details.

## Summary

In the second series of my lessons learned the main takeaways are
* Compiling only parts of the document with `\includeonly{<path/to/file.tex>}` saves a lot of time. 
* Filter reference information automatically is more convenient than manually deleting information in the bib file
* Widows and orphans can be avoided easily by introducing custom penalties
* The packages `csquotes`, `siunitx`, `cleveref`, `enumitem` should be called in every preamble

In the [next part](/blog/2022/LaTeX-Thesis-Lessons-Learned-Part-3/) we will look at an automated way of integrating a nomenclature into a LaTeX thesis document. 