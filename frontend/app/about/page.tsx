import Image from "next/image";
import React from "react";
import about from "../../public/about.png";
import about1 from "../../public/about1.png";
import about3 from "../../public/about3.png";
const page = () => {
  return (
    <div className={`w-full text-sm font-inter px-[15px] tracking-[0px]`}>
      <div className="mt-4 flex flex-col justify-center gap-y-4 rounded-[10px] bg-white p-[30px]">
        <div className="flex flex-col gap-y-[59px] rounded-[10px] border border-solid border-gray-200 pb-16">
          <div className="">
            <div className="text-[45px] leading-[54px] ">
              <Image src={about} width={2000} height={360} alt="about" />
            </div>
          </div>
          <div className="flex items-center pr-32 pl-24">
            <div className="flex flex-grow flex-wrap items-start justify-center gap-x-48 gap-y-11 uppercase min-[1380px]:flex-nowrap">
              <div className="flex-shrink-0 w-72 text-lg font-bold leading-8">
                <span>
                  <p>
                    {"our purpose is to "}
                    <span className="text-[limegreen]">enrich</span>
                  </p>
                  <p>
                    <span className="text-[limegreen]">
                      {"and enhance lives "}
                    </span>
                    through
                  </p>
                  <p>technology</p>
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-[76px] gap-y-11 text-xs leading-5 text-[dimgray] min-[1380px]:flex-nowrap">
                <div className="flex flex-col items-center pt-[0.7px]">
                  <div className="w-36">
                    <div className="text-[40px] font-bold leading-[48px]">
                      $12,5M
                    </div>
                    <div className="w-32">
                      <span>
                        <p>total revenue from</p>
                        <p>2001 - 2023</p>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-11 min-[1380px]:flex-nowrap">
                  <div className="flex flex-col items-center pt-[0.7px]">
                    <div className="w-40">
                      <div className="text-[40px] font-bold leading-[48px]">
                        12K+
                      </div>
                      <div className="self-stretch">
                        <span>
                          <p>orders delivered</p>
                          <p>successful on everyday</p>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center pt-[0.7px]">
                    <div className="w-[152px]">
                      <div className="text-[40px] font-bold leading-[48px]">
                        725+
                      </div>
                      <div className="self-stretch">
                        <span>
                          <p>store and office in U.S</p>
                          <p>and worldwide</p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-nowrap items-center justify-center gap-x-2 gap-y-2 min-[1380px]:flex-nowrap">
          <div className="flex items-center rounded-[10px]">
            <Image src={about1} width={640} height={420} alt="about1" />
          </div>
          <div className="flex w-[646px] flex-shrink-0 flex-col items-start justify-center gap-y-[30px] rounded-[10px] bg-gray-200 px-24 py-[70px]">
            <div className="self-stretch text-lg font-bold leading-[22px]">
              <span>
                <p>We connect millions of buyers and sellers around</p>
                <p>the world, empowering people & creating economic</p>
                <p>opportunity for all.</p>
              </span>
            </div>
            <div className="self-stretch leading-6 text-[dimgray]">
              <span>
                <p>
                  Within our markets, millions of people around the world
                  connect,
                </p>
                <p>
                  both online and offline, to make, sell and buy unique goods.
                  We also
                </p>
                <p>
                  offer a wide range of Seller Services and tools that help
                  creative
                </p>
                <p>entrepreneurs start, manage & scale their businesses.</p>
              </span>
            </div>
            <div className="">
              <div className="rounded-[10px] bg-[limegreen] p-2 text-center text-xs font-medium uppercase leading-[18px] text-white">
                <span className="whitespace-pre-wrap">{" our showreel"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 pt-4 leading-[25px] text-[dimgray] min-[1380px]:flex-nowrap">
        <div className="flex w-[448px] flex-shrink-0 flex-col items-start gap-y-12 rounded-[10px] bg-white px-6 pb-12 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-x-56 gap-y-[22px] min-[1380px]:flex-nowrap">
            <div className="w-[119px] flex-shrink-0 pb-[0.6px]">
              <div className="text-lg font-bold uppercase leading-[22px]">
                <span>
                  <p>affordable</p>
                  <p>price</p>
                </span>
              </div>
            </div>
            <div className="h-[60px] w-[60px] flex-shrink-0 rounded-full bg-[limegreen]" />
          </div>
          <div className="w-96">
            <span>
              <p>We offer an affordable & competitive price with a lots of</p>
              <p>special promotions.</p>
            </span>
          </div>
        </div>

        <div className="flex w-[448px] flex-shrink-0 flex-col items-start gap-y-12 rounded-[10px] bg-white px-6 pb-12 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-x-56 gap-y-[22px] min-[1380px]:flex-nowrap">
            <div className="w-[119px] flex-shrink-0 pb-[0.6px]">
              <div className="text-lg font-bold uppercase leading-[22px]">
                <span>
                  <p>100% authentic products</p>
                  <p>products</p>
                </span>
              </div>
            </div>
            <div className="h-[60px] w-[60px] flex-shrink-0 rounded-full bg-[limegreen]" />
          </div>
          <div className="w-96">
            <span>
              <p>Swoo Tech Mart just distribute 100% authorized products &</p>
              <p>
                guarantee quality. Nulla porta nulla nec orci vulputate, id
                rutrum sapien varius.
              </p>
            </span>
          </div>
        </div>

        <div className="flex w-[448px] flex-shrink-0 flex-col items-start gap-y-12 rounded-[10px] bg-white px-6 pb-12 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-x-56 gap-y-[22px] min-[1380px]:flex-nowrap">
            <div className="w-[119px] flex-shrink-0 pb-[0.6px]">
              <div className="text-lg font-bold uppercase leading-[22px]">
                <span>
                  <p>fast</p>
                  <p>delivery</p>
                </span>
              </div>
            </div>
            <div className="h-[60px] w-[60px] flex-shrink-0 rounded-full bg-[limegreen]" />
          </div>
          <div className="w-96">
            <span>
              <p>Fast shipping with a lots of option to delivery. 100%</p>
              <p>
                guarantee that your goods alway on time and perserve quality
              </p>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-center gap-y-[30px] rounded-[10px] bg-white px-[30px] pb-11 pt-[30px]">
        <div className="leading-[25px]">
          <div className="flex flex-col items-start gap-y-[30px] border-b border-solid border-gray-200 pb-[30px]">
            <div className="text-lg font-bold uppercase leading-[22px]">
              our mission and vision
            </div>
            <div className="">
              Nam maximus nunc a augue pulvinar, non euismod mauris tempus. Cras
              non elit vel magna molestie pellentesque in eu dui. Donec laoreet
              quis erat vitae finibus. Vestibulum enim eros, porta eget quam et,
              euismod dictum elit. Nullam eu tempus magna. Fusce malesuada nisi
              id felis placerat porta vel sed augue. Vivamus mollis mauris vitae
              rhoncus egestas. Pellentesque habitant morbi tristique senectus et
              netus et malesuada fames ac turpis egestas.
            </div>
            <Image src={about3} width={1600} height={420} alt="about3" />
          </div>
          <div className="flex flex-col items-start justify-center gap-y-[30px] border-b border-solid border-gray-200 py-[30px] pr-[1.8px]">
            <div className="text-lg font-bold uppercase leading-[22px]">
              from a retail store to the global chain of stores
            </div>
            <div>
              Pellentesque laoreet justo nec ex sodales euismod. Aliquam orci
              tortor, bibendum nec ultricies ac, auctor nec purus. Maecenas in
              consectetur erat.
            </div>
            <div className="flex flex-wrap items-start justify-center gap-x-[91px] gap-y-[91px] self-stretch text-[dimgray] min-[1380px]:flex-nowrap">
              <div className="flex flex-wrap items-center justify-center gap-x-[2.4px] gap-y-[2.4px] min-[1380px]:flex-nowrap">
                <div className="flex flex-col items-center pt-[0.01px]">
                  <div className="flex flex-col gap-y-6 items-start font-bold">
                    <div>
                      <div>1997:</div>
                      <div>1998:</div>
                      <div>2000:</div>
                      <div>2002:</div>
                      <div>2004:</div>
                      <div>2005:</div>
                    </div>
                    <div className="text-center">2006:</div>
                    <div className="flex flex-col justify-end items-start pt-6 text-center">
                      <div>2010:</div>
                      <div>2013:</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center pt-[0.01px]">
                  <div className="w-[544px]">
                    <div>A small store located in Brooklyn Town, USA</div>
                    <div className="px-[1.6px]">
                      It is a long established fact that a reader will be
                      distracted by the readable
                    </div>
                    <div className="px-[4.4px]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry
                    </div>
                    <div className="px-[3.7px]">
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since the
                    </div>
                    <div className="px-[4.3px]">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text
                    </div>
                    <div className="self-stretch pl-1">
                      <span>
                        <p>
                          The point of using Lorem Ipsum is that it has a
                          more-or-less normal distribution of
                        </p>
                        <p>letters, as opposed to using 'Content here</p>
                      </span>
                    </div>
                    <div className="self-stretch pl-1 pr-[3.6px]">
                      <span>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority
                        </p>
                        <p>
                          have suffered alteration in some form, by injected
                          humour, or randomised words
                        </p>
                        <p>which don't look even slightly believable.</p>
                      </span>
                    </div>
                    <div className="px-[1.8px]">
                      All the Lorem Ipsum generators on the Internet tend to
                      repeat predefined
                    </div>
                    <div className="px-[1.6px]">
                      Lorem Ipsum comes from sections 1.10.32
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-start justify-center gap-x-[4.4px] gap-y-[4.4px] min-[1380px]:flex-nowrap">
                <div className="flex flex-col items-center pt-[0.01px]">
                  <div className="flex flex-col gap-y-6 items-start font-bold">
                    <div>2014:</div>
                    <div>2016:</div>
                    <div>
                      <div>2020:</div>
                      <div>2021:</div>
                      <div>2022:</div>
                    </div>
                    <div className="text-center">2023:</div>
                  </div>
                </div>
                <div>
                  <div className="self-stretch pl-[0.62px] [max-width:573px]">
                    <div>
                      <span>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have
                        </p>
                        <p>suffered alteration in some form</p>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center self-stretch pl-[0.37px] pr-[19px] [max-width:573px]">
                    <div className="flex-grow">
                      <span>
                        <p>
                          All the Lorem Ipsum generators on the Internet tend to
                          repeat predefined chunks as
                        </p>
                        <p>necessary</p>
                      </span>
                    </div>
                  </div>
                  <div className="px-[2.6px]">
                    Lorem Ipsum comes from sections 1.10.32
                  </div>
                  <div>
                    Making this the first true generator on the Internet
                  </div>
                  <div className="self-stretch pl-0.5 pr-[3.2px] [max-width:573px]">
                    <div>
                      <span>
                        <p>
                          Lorem Ipsum which looks reasonable. The generated
                          Lorem Ipsum is therefore always
                        </p>
                        <p>free from repetition, injected humour</p>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center self-stretch pl-[2.4px] pr-[7.2px] [max-width:573px]">
                    <div className="flex-grow">
                      <span>
                        <p>
                          here are many variations of passages of Lorem Ipsum
                          available, but the majority have
                        </p>
                        <p>suffered alteration in some form</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
