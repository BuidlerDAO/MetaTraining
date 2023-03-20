import FooterBG from '@/assets/website/footer_background.png';

export default function Footer() {
  return (
    <div id="footer" className="relative mt-12 w-full pt-4">
      <img
        className="h-[450px] w-full bg-sky-900 object-cover brightness-50 md:h-[370px]"
        src={FooterBG}
      ></img>
      <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-sm">
        <div>
          <p className="mb-6 text-center font-mono text-xl font-bold text-[#e6e6e6]">
            Contact us
          </p>
          <div className="flex flex-wrap content-start">
            <div className="mr-6 mb-3 flex items-center" />
            <p className="text-left font-mono text-base font-thin text-[#ebebeb]">
              非常期待致力于更好的 web3 启蒙{' '}
              <a href="mailto:aboutmydreams@163.com">
                Incubated by @MetaTraining
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
