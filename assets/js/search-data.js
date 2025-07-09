// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "(in reversed chronological order)",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-teaching",
          title: "Teaching",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "post-writing-a-thesis-in-latex-part-4",
        
          title: "Writing a thesis in LaTeX - part 4",
        
        description: "Create and integrate beautiful vector graphics",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/LaTeX-Thesis-Lessons-Learned-Part-4/";
          
        },
      },{id: "post-writing-a-thesis-in-latex-part-3",
        
          title: "Writing a thesis in LaTeX - part 3",
        
        description: "Integrate a nomenclature with glossaries-extra and bib2gls",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/LaTeX-Thesis-Lessons-Learned-Part-3/";
          
        },
      },{id: "post-writing-a-thesis-in-latex-part-2",
        
          title: "Writing a thesis in LaTeX - part 2",
        
        description: "Useful LaTeX packages, commands and hacks",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/LaTeX-Thesis-Lessons-Learned-Part-2/";
          
        },
      },{id: "post-writing-a-thesis-in-latex-part-1",
        
          title: "Writing a thesis in LaTeX - part 1",
        
        description: "A minimal working example",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/LaTeX-Thesis-Lessons-Learned-Part-1/";
          
        },
      },{id: "news-hello-world-my-first-personal-website-is-drafted",
          title: 'Hello World! My first personal website is drafted.',
          description: "",
          section: "News",},{id: "news-new-publication-automatic-modal-analysis-using-bayesian-optimization",
          title: 'New publication: Automatic modal analysis using Bayesian optimization.',
          description: "",
          section: "News",},{id: "news-phd-thesis-successfully-defended-download-the-thesis-here",
          title: 'PhD thesis successfully defended! Download the thesis here.',
          description: "",
          section: "News",},{id: "news-new-publication-exposure-time-and-point-cloud-quality-prediction-for-active-3d-imaging-sensors-using-gaussian-process-regression",
          title: 'New publication: Exposure time and point cloud quality prediction for active 3D imaging...',
          description: "",
          section: "News",},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
