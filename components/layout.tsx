import Header from './header';
import Footer from './footer';

export default function Layout({ children }: any) {
    return (
        <div className='flex flex-col'>
            <Header />
            <main className='w-full h-auto'>
                <div className='box-border items-center content-center leading-6 md:flex-row max-w-7xl mx-auto'>
                    <div className='mx-10'>
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
