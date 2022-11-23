---
layout: post
title: Writing a thesis in LaTeX - part 3
date: 2022-11-06 20:00:00
description: Integrate a nomenclature with glossaries-extra and bib2gls
tags: LaTeX
categories: research
---
In the [previous part](/blog/2022/LaTeX-Thesis-Lessons-Learned-Part-2/) of this blog series, useful LaTeX packages, commands and hacks were introduced. The next step is adding a nomenclature which contains all acronyms, symbols and notations of the document. This can be done, for example, by reviewing the final document and manually creating and inserting a table. The disadvantage of this manual approach is that if an abbreviation or symbol has to be changed, it has to be changed manually everywhere in the entire document, potentially leading to one or two cases that are missed. Furthermore, acronyms have to be defined with their first use. Going back and forth through the document and constantly enhancing the content, the place of the first use can change and one might forget to adjust the definition of the abbreviation. Either way, creating a nomenclature manually requires an author to keep one more thing in mind, when all that the author should actually care about, is the content of the thesis.

In this blog post, an automatic approach for integrating a nomenclature in a LaTeX thesis will be introduced. The approach uses the packages [`bib2gls`](https://ctan.org/pkg/bib2gls?lang=de) and [`glossaries-extra`](https://www.ctan.org/pkg/glossaries-extra) and consists of two main steps:

1. [The acronyms are stored in a bib file](#preparing-the-bib-files-for-bib2gls). This bib file will be translated to a glstex file in which all acronyms, notations and symbols are listed and sorted by the `bib2gls` package
2. The `glossaries-extra` package will use the glstex file and [compile a nomenclature](#using-the-glossaries-extra-package)

In the following, the two steps will be explained in more detail and a zipped version of the project can be downloaded [here](/downloads/thesis - GLS.zip), which results in the following pdf:

<p style="text-align: center;">
<object data="/latex/thesis - GLS/main.pdf" width="75%" height="500" type='application/pdf'></object>
</p>

## Prerequisites

1. In order for `bib2gls` to work as intended, `Java` must be installed, which can be downloaded [here](https://www.java.com/download/).
2. Install `bib2gls` via MikTeX Console: Open MikTeX Console > Packages > Search for bib2gls > right click > install.
3. In order to run `bib2gls` from TeXstudio, a user defined tool needs to be set: Preferences > Build > add the following in the lower part of the window: `path/to/bib2gls.exe %` and give it a name (e.g., "bib2gls"). You should see the the user defined tool in: Tools > User. 

## Preparing the bib files for `bib2gls`

Since the acronyms, notations and symbols are stored in bib files, there are three new files in the source folder of the LaTeX project defined in the [first part](/blog/2022/LaTeX-Thesis-Lessons-Learned-Part-1/) of this blog series:

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
│   │   acronyms.bib % new: bib file with acronyms
│   │   notations.bib % new: bib file with notations
│   │   symbols.bib % new: bib file with symbols
│   
└───figures
│   │   jamesWebb.png
{% endraw %}
{% endhighlight %}

The bib file `acronyms.bib` looks as follows:

{% highlight tex %}
{% raw %}
@acronym{ml,
	short={ML},
	name={ML},
	long={machine learning}
}
@acronym{dl,
	short={DL},
	name={DL},
	long={deep learning}
}
@acronym{fft,
	short={FFT},
	name={FFT},
	plural={FFTs},
	long={fast Fourier transform},
	longplural={fast Fourier transforms}
}
{% endraw %}
{% endhighlight %}

It can be seen that each acronym can simply be declared with `@acronym{<label>, <keys>}`. Accordingly, the bib file `notations.bib` looks as follows:

{% highlight tex %}
{% raw %}
@symbol{determinant,
	name={\(\mathrm{det}(X)\)},
	description={determinant of a matrix}
}
@symbol{abs,
	name={\(|x|\)},
	description={absolute value of a variable}
}
{% endraw %}
{% endhighlight %}

In this case, each entry can be defined using `@symbol{<label>, <keys>}`. The bib file `symbols.bib` looks as similar:

{% highlight tex %}
{% raw %}
@symbol{x_dot,
	name={\ensuremath{\dot{x}}},
	description={velocity in \unit{\meter\per\second}}
}
@symbol{F,
	name={\ensuremath{F}},
	description={force}
}
@symbol{omega,
	name={\ensuremath{\omega}},
	description={angular velocity in \unit{\per\second}}
}
{% endraw %}
{% endhighlight %}

## Using the `glossaries-extra` package

The pre-defined acronyms, notations and symbols can now be referenced with the `glossaries-extra` package. But first the package needs to be integrated (i.e., `\usepackage{glossaries-extra}`) and the three bib files have to loaded with `\GlsXtrLoadResources[src=path/to/file]` in the preamble:

{% highlight tex %}
{% raw %}
\usepackage[record,style=indexgroup]{glossaries-extra}
\setabbreviationstyle[acronym]{long-short}
% acronyms
\GlsXtrLoadResources[src=source/acronyms,sort=letter-nocase,group=Acronyms]
% notations
\GlsXtrLoadResources[src=source/notations,sort=letter-nocase,group=Notations]
% symbols
\GlsXtrLoadResources[src=source/symbols,sort=letter-nocase,group=Symbols]
% rename the chapter from GLossary to Nomenclature
\renewcommand*{\glossaryname}{Nomenclature}
{% endraw %}
{% endhighlight %}

Above, a certain style for displaying acronyms was already set (i.e., `\setabbreviationstyle[acronym]{long-short}`), which makes sure that an acronym is fully displayed and defined when it is first used. Furthermore, the name of the chapter was changed from "Glossary" to "Nomenclature". See section 1.7 of the pdf above for examples.

In the document, the nomenclature is printed with the `\printunsrtglossaries`:

{% highlight tex %}
{% raw %}
\frontmatter % switches to lower case roman page numbers
\tableofcontents
\listoffigures
\listoftables
\printunsrtglossaries
{% endraw %}
{% endhighlight %}

The glossaries are called is plural as technically there are three glossaries (acronyms, notations and symbols), which have to be printed. However, they are automatically organized in groups due to the `style=indexgroup` option that was set when loading the `glossaries-extra` package in the preamble (more styles can be found [here](https://www.dickimaw-books.com/gallery/glossaries-styles/)).

Now, the acronyms, notations of symbols can be referenced with the `\gls{<label>}` command. In the `introduction.tex` file this is exemplarily done:

{% highlight tex %}
{% raw %}
Usually the first time derivative is denoted as \gls{x_dot} and \gls{ml} is a field that has been thriving in recent years, especially due to advances in \gls{dl}. When \gls{ml} is called for the second time, only its acronym is displayed.
{% endraw %}
{% endhighlight %}

It is also possible to use plural terms with the `\glspl{<label>}` command:
{% highlight tex %}
{% raw %}
it is possible to write about several \glspl{fft}.
{% endraw %}
{% endhighlight %}

Check out the pdf displayed above, where the nomenclature is automatically created. The acronyms, notations and symbols are divided into three groups and are sorted within their respective group. Furthermore, only entires actually used in the document are displayed and the page number of the first use is added. This would be a lot more work if done manually by hand. In case the page number should be hidden, adding `nonumberlist` to the options of the `glossaries-extra` package will do the trick.

*Note, that `bib2gls` needs the aux files to identify the acronyms, notations and symbols. Hence, first compile the document, then run `bib2gls` and the re-compile the document for final results.*

## Summary

The key takeaways of this blog should be that
* creating a nomenclature with `glossaries-extra` is recommended as it automates the process and avoids errors and that
* `bib2gls` is a convenient tool for outsourcing the definitions of acronyms, notations and symbols to bib files.

In the [next part](/blog/2022/LaTeX-Thesis-Lessons-Learned-Part-4/) we will look at a workflow for plotting vector graphics with `matpltolib` and automatically integrating the vector graphics in the LaTeX thesis document. 