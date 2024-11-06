import logo from '../../assets/groceraid_logo.png';

const Home = () => {
    return (

        <div className="pl-[15rem] container font-serif mr-[4rem] sm:mt-[1 rem] md:mt-[4rem]">
            <h1 className="text-xl font-semibold mb-2 text-gray-300">welcome to...</h1>
            <img className='h-20 md:h-36 lg:h-48 w-auto mb-2' src={logo} alt='logo'/>
        </div>
    );
  };
  
  export default Home;