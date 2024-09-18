import HomeGIF from '@/assets/giphy.webp';

const Home: React.FC = () => {

    return (
        <div className="container p-6 mx-auto h-[100vh] flex flex-col justify-center items-center">
            <div>
            <img src={HomeGIF} alt="gif" />
            </div>
            <h1 className="mb-6 text-3xl font-bold text-center">Welcome to YIPL.</h1>
        </div>
    );
};

export default Home;
