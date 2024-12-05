import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './sections/Projects';
import ContactForm from './sections/Contact';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <section id="about">
        <Hero />
        </section>
        <section id="projects">
        <Projects />
        </section>
        <section id="contact">
        <ContactForm/>
        </section>
      </div>
    </ThemeProvider>
  );
}

export default App;