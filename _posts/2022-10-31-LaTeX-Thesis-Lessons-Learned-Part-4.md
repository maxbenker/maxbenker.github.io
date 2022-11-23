---
layout: post
title: Writing a thesis in LaTeX - part 4
date: 2022-11-09 17:00:00
description: Create and integrate beautiful vector graphics
tags: LaTeX python
categories: research

---
In the [previous part](/blog/2022/LaTeX-Thesis-Lessons-Learned-Part-3/) of this blog series, an introduction to the `bib2gls` and `glossaries-extra` packages for automatically generating glossaries was given. In this last part of the blog series, a neat workflow for creating and integrating vector graphics (e.g., svg graphics) in the thesis document will be presented. This will be done in two steps:

1. [Creating vector graphics](#creating-scientific-plots-with-matplotlib) in `matplotlib`.
2. [Integrating the vector graphics in LaTeX](#integrating-vector-graphics-in-latex) with the help of Inkscape

A zipped version of the project can be downloaded [here](/downloads/thesis - SVG.zip). Compiling the project gives you the following pdf:

<p style="text-align: center;">
<object data="/latex/thesis - SVG/main.pdf" width="75%" height="500" type='application/pdf'></object>
</p>

## Prerequisites

1. `python`, `matplotlib` and `numpy` must be installed. By [installing anaconda](https://www.anaconda.com/products/distribution), all that is done at once.
2. [Inkscape must be installed](https://inkscape.org/release/inkscape-1.2.1/) and added to the system's PATH variables (make sure to chose this option during installation).
3. The following user defined tool must be added in Texstudio: `txs:///pdflatex/[--shell-escape]` (Preferences > Build > add the command in the lower part of the window and give it a name, such as "svg2tex")

## Creating scientific plots with `matplotlib`

First, we will add a new folder to the LaTeX project, which contains the [Jupyter notebook](https://jupyter.org/) file that creates the vector graphics. Furthermore, we add a mplstyle file, which contains necessary `matplotlib` style settings, in the source folder. The final project structure looks as follows:

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
│   │   acronyms.bib 
│   │   notations.bib
│   │   symbols.bib 
│   │   svg.mplstyle % new: mplstyle file with the necessary matplotlib style settings
│   
└───figures
│   │   jamesWebb.png
│
└───notebooks % new: folder for jupyter notebooks
│   │   plot.ipynb % new: python notebook creating a vector graphic and storing it in the figures folder
{% endraw %}
{% endhighlight %}

First, the vector graphic, that will be integrated in the LaTeX document, has to be generated. This is done in the notebook `plot.ipynb`, which loads the necessary python packages `numpy` and `matplotlib`:

{% highlight python %}
{% raw %}
import numpy as np
import matplotlib.pyplot as plt
{% endraw %}
{% endhighlight %}

Futhermore, the pre-defined matplotlib style `svg.mplstyle` is loaded and used for all plots:

{% highlight python %}
{% raw %}
plt.style.use(['file:../source/svg.mplstyle'])
{% endraw %}
{% endhighlight %}

The file `svg.mplstyle` contains only a few `matplotlib` settings, that we will need for integrating the vector graphic in the LaTeX document:

{% highlight python %}
{% raw %}
# set svg fonttype
svg.fonttype : none

# do not use unicode minus
axes.unicode_minus : False
{% endraw %}
{% endhighlight %}

That's it. Now, we can create vector graphics and save them in the figures folder:

{% highlight python %}
{% raw %}
x = np.linspace(-1, 1, 100) # create vector of inputs
y = x**2 + np.random.normal(0, 0.01, size=len(x)) # create vector of outputs

fig, ax = plt.subplots(figsize=(3,2)) # create figure
ax.plot(x, y) # plot data
ax.set(xlabel='\$x\longrightarrow\$', ylabel='\$f(x)\longrightarrow\$', title='\$f(x) = x^2 + \epsilon, \quad \epsilon \sim N(0, 0.01)\$') # set labels and title
ax.grid() # display a grid

plt.savefig('../figures/plot.svg', format='svg') # save the figure
plt.show() # show the figure
{% endraw %}
{% endhighlight %}

This creates and saves a vector graphic called `plot.svg` in the figures folder.

In the next step, this svg figure will be further processed by Inkscape to a pdf_tex file and a pdf file, which finally can be integrated in the LaTeX document. How to do this automatically is described in the next section.

## Integrating vector graphics in LaTeX

First, the [svg package](https://ctan.org/pkg/svg?lang=en) is loaded in the preamble of the `main.tex` file and a few options are set:

{% highlight tex %}
{% raw %}
\usepackage{svg}
\svgpath{{figures/}} % tell the svg package where to find the svg files
{% endraw %}
{% endhighlight %}

One very handy feature of integrating vector graphics this way is, that the font can be globally defined for *all* vector graphics in the *entire* document. This can be done with the `floatrow` package. Say we want the fontsize of all vector graphics in the document to be smaller (e.g., `footnotesize`), than this can be set globally in the preamble:

{% highlight tex %}
{% raw %}
\usepackage{floatrow} % for global setting of fontsize in floats (tables and figures)
\floatsetup[figure]{font={footnotesize}}
{% endraw %}
{% endhighlight %}

What's still missing is the actual integration of the vector graphic in the `introduction.tex` file. This can be done as follows:

{% highlight tex %}
{% raw %}
\begin{figure}
	\centering
	\includesvg{plot}
	\caption{A sample vector graphic}
	\label{fig:plot}
\end{figure} 	
{% endraw %}
{% endhighlight %}

That is it! Feel free to try to integrate a second figure and change the fontsize to `large` and see what happens.

*Note, that in order to successfully compile the entire document including the svg file and the nomenclature in TeXstudio, you have to compile in the following order: "svg2tex" user tool > "bib2gls" user tool > F5.*

## Summary

In this last part of the bolg series, an automated workflow for integrating vector graphics into a LaTeX document was presented. The main takeaways should be:

1. `matplotlib` is a free and efficient way of creating svg files that can easily be integrated into a LaTeX document
2. With the help of the `svg` and `floatrow` packages, the fonts of vector graphics can be globally set. This leads to a uniform appearance of all plots and can be handy for late changes.

With this last part of the blog series, I hope I could convince you that writing a thesis in LaTeX is worth the effort and I hope that I could help you to write a beautiful thesis in LaTeX with less pain but more fun!