import { MapPinIcon, EnvelopeIcon, PhoneIcon, GlobeAltIcon, LanguageIcon } from "@heroicons/react/20/solid";
import GitHubIcon from "./GitHubIcon";

const Hero = () => {
    const HeroItem = ({ Icon, children }) => (
        <span className="flex flex-row gap-2 items-center">
            <Icon className="h-4 w-4 fill-gray-400" />

            {children}
        </span>
    );

    return (<>
        <header className="px-8 py-16 bg-gray-800">
            <div className="max-w-screen-md print:max-w-none mx-auto flex flex-col sm:flex-row justify-between gap-8">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-semibold text-white">
                        Laurenz Weixlbaumer
                    </h1>

                    <p className="text-gray-300">
                        Computer Science student, enthusiastic about everything
                        programming-related, looking to expand my knowledge and
                        gain experience working in a professional environment.
                        Tiny bit of a nerd.
                    </p>
                </div>

                <img className="object-cover w-36 h-36 rounded-md" src="./portrait.jpeg" />
            </div>
        </header>

        <section className="px-8 py-4 bg-gray-900 text-gray-400">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-md print:max-w-none mx-auto">
                <HeroItem Icon={EnvelopeIcon}>
                    <a href="mailto:root@fsoc.space">root@fsoc.space</a>
                </HeroItem>

                <HeroItem Icon={PhoneIcon}>
                    0699 17057679
                </HeroItem>

                <HeroItem Icon={MapPinIcon}>
                    Hittmairstraße 64, Linz
                </HeroItem>

                <HeroItem Icon={GlobeAltIcon}>
                    <a href="https://fsoc.space">fsoc.space</a>
                </HeroItem>

                <HeroItem Icon={GitHubIcon}>
                    <a href="https://github.com/fs-c">fs-c</a>
                </HeroItem>

                <HeroItem Icon={LanguageIcon}>
                    German, English
                </HeroItem>
            </div>
        </section>
    </>);
};

const Experience = () => {
    const ExperienceItem = ({ title, from, to, time, children }) => (
        <div>
            <div className="flex flex-row gap-4 justify-between">
                <span className="font-bold">
                    {title}
                </span>

                <span className="italic">
                    {time ? time : <span>{from} &mdash; {to}</span>}
                </span>
            </div>

            <p className="text-gray-700">
                {children}
            </p>
        </div>
    );

    return (<>
        <section className="p-8">
            <div className="flex flex-col gap-6 max-w-screen-md print:max-w-none mx-auto">
                <ExperienceItem title="BORG Linz" from="2015" to="2020">
                    In a branch with particular consideration for Informatics. Also attended HeadStart@Informatics classes at JKU during this time.
                </ExperienceItem>

                <ExperienceItem title="Software Architects, Internship" time="Summer 2019">
                    Developed a prototype for a component of a client project using TypeScript, Angular and an internal DSL.
                </ExperienceItem>

                <ExperienceItem title="Abendgymnasium Linz für Berufstätige" from="2020" to="2021">
                    Obtained Matura with VWA about the efficiency of selected sorting and searching algorithms, and how to determine it.
                </ExperienceItem>

                <ExperienceItem title="Kinderfreunde OÖ, Zivildienst" time="2021" />

                <ExperienceItem title="JKU" from="2021" to="">
                    Studying to obtain a Bachelor's degree in Computer Science. 
                </ExperienceItem>
            </div>
        </section>
    </>);
};

// real a4 dimensions: 210x297. have to use 211mm for width because otherwise 
// an a4 pdf created with firefox will have a white border
const Page = ({ children }) => (
    <section className="print:w-[211mm] print:h-[297mm] w-full bg-gray-200 flex flex-col">
        {children}

        <div className="grow"></div>

        <footer class="px-8 py-4 text-gray-400 text-sm text-center print:block hidden">
            This CV and cover letter are built with React and TailwindCSS. <a href="https://github.com/fs-c/files/tree/archive/misc/cv">See source.</a>
        </footer>
    </section>
);

const App = () => {
    return (<>
        <Page>
            <Hero />

            <Experience />
        </Page>
        
        <Page>
            <div className="text-lg bg-gray-800 text-gray-300 py-8 px-8">
                <p className="max-w-screen-md print:max-w-none mx-auto">
                    I am a motivated developer and quick learner with years of 
                    experience working on a variety of personal projects, primarily using JavaScript, 
                    TypeScript, React and C++. 
                    Independently of language or framework, I strongly value clean 
                    and efficient code and have high-quality standards for my work.
                </p>
            </div>

            <div className="px-8 py-8 text-gray-700">
                <div className="flex flex-col gap-4 max-w-screen-md print:max-w-none mx-auto">
                    <p>
                        I maintain a blog on <a href="https://fsoc.space/words">fsoc.space/words</a> to 
                        document some of my personal projects. It particularly showcases my interest in 
                        low-level programming and reverse engineering, see for example <a href="https://fsoc.space/words/ctf-writeup-index/">my collection 
                        of CTF and CrackMe writeups</a> and this post about <a href="https://fsoc.space/words/refactoring-a-pattern-scanner/">pattern scanning process memory on Windows</a>. 
                        Another post that I feel is worth highlighting is an interactive exploration of <a href="https://fsoc.space/words/drawing-squiggly-lines/">randomly generating smooth shapes</a>, using JavaScript and the Canvas API.
                    </p>

                    <p>
                        My proudest project is <a href="https://github.com/fs-c/maniac">maniac</a>, 
                        a cheat for the game osu!mania. It reads game state from memory to then simulate 
                        human gameplay. The first working commit to the repository was in 2018 and it is still 
                        being actively maintained. It gets thousands of views and hundreds of downloads 
                        per week. Maniac is written in C++ with CMake as the build tool, using GitHub Actions 
                        to generate public debug builds for each commit and to automate releases.
                    </p>

                    <p>
                        I have some experience with Java thanks to university courses but 
                        have never used it for a serious project. Similarly, I have worked 
                        with Angular in the past but am not particularly familiar with it. 
                        I am confident that my experience in related technologies will allow me 
                        to quickly reach a productive proficiency in any language or framework 
                        you might use in your stack and excited to work with technologies 
                        that are new to me.
                    </p>

                    <p>
                        I am available from the 1st of July to the 30th of September 2023.
                    </p>
                </div>
            </div>
        </Page>
    </>);
};

export default App;
