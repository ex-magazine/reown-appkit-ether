import React from 'react';
import { useState } from 'react';

import Accordion from './Accordion';

const Docaccordion: React.FC = () => {
  const faqItems = [
    { id: '1', title: 'Question 1', content: 'Answer 1...' },
    { id: '2', title: 'Question 2', content: 'Answer 2...' },
    { id: '3', title: 'Question 3', content: 'Answer 3...' },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 pt-20">
      <div className="w-full">
        <Accordion items={faqItems} />

        <div className="border border-gray-300 rounded-md">
          <button
            className="flex items-center justify-between w-full p-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>TOKENOMIC CỦA MỘT SỐ DỰ ÁN DOANH THU TOP THỊ TRƯỜNG</span>
            <svg
              className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-max-height duration-300 ${isOpen ? "h-full" : "max-h-0"
              }`}
          >
            <div className="p-4 border-t border-gray-300">
              <div className="mb-2 text-gray-500 dark:text-gray-400">
                <h3>$UNI #Uniswap</h3>
                <p>
                  Tạo ra khoảng $1,2 tỷ USD phí mỗi năm. 0.25% khối lượng giao dịch là interface fees ($5 - $10M mỗi tháng) chảy về túi Uniswap Labs, phần còn lại là LP fees thuộc về Liquidity Privider => UNI holder không nhận được giá trị gì, lmao.
                  Ngoài ra, design tokenomic của UNI không giới hạn tổng cung. Initial total supply = 1B, sau khi vesting hết thì bắt đầu quá trình lạm phát vĩnh viễn 2% mỗi năm. Mặc dù con số này không quá lớn (~21% sau 10 năm) nhưng đó là một khoản ăn mòn dần giá trị của holder.
                  Nó như kiểu, hãy mua cổ phần công ty của tôi đi, lợi nhuận hàng năm tôi sẽ không chia cho các bạn tí nào nhưng ngoài ra mỗi năm tôi sẽ tiếp tục in ra và bán thêm 2% cổ phần nữa. LOL.
                  Nếu không có gì thay đổi thì động lực nắm giữ UNI chỉ còn mỗi nằm chờ pump dump. Lối thoát duy nhất cho UNI holder là cơ chế Fee Switch, khi được kích hoạt nó cho phép chia sẻ một phần LP fee về DAO Treasury và có thể sẽ được phân bổ tới UNI holders.
                  Thực ra cơ chế fee switch đã có từ đầu nhưng cho đến hiện tại vẫn chưa thể kích hoạt vì vấn đề pháp lý, nó có thể khiến SEC đưa Uniswap vào danh sách chứng khoán, mà Founder Uni ở Mỹ ngay chân thiên tử nên cho tiền cũng ko dám.
                  Thời gian qua, dưới sự mở cửa hành lang pháp lý crypto thời Trump, Uniswap đang đẩy nhanh các hoạt động để bật fee switch như thành lập Uniswap Governance, chạy thử nghiệm chia doanh thu. Hy vọng tương lai gần UNI holder sẽ nhận được giá trị từ việc nắm giữ token.
                  Tóm lại, tokenomics của UNI theo mô hình revenue sharing, dòng doanh thu sẽ chảy về token holder tương tự cổ tức, từ đó tạo ra giá trị tích luỹ cho cổ đông. Bên cạnh đó cơ chế lạm phát vĩnh viễn 2% tạo ra nguồn khuyến khích dài hạn cho các hoạt động phát triển hệ sinh thái cũng như thúc đẩy holder tham gia hoạt động của dự án chứ không chỉ cầm token thụ động.
                </p>
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                <h3>$CAKE #Pancakeswap</h3>
                <p>
                  Tạo ra khoảng $1.8 tỷ USD phí giao dịch mỗi năm, mang về $450M doanh thu và có tới $325M giá trị dành cho CAKE holder.
                  Kể từ phiên bản tokenomics 3.0 CAKE đã từ bỏ veToken + revenue sharing để chuyển sang mô hình giảm phát thông qua buy back & burn.
                  Theo đó 15% swap fee cùng nhiều khoản phí tiện ích sẽ được sử dụng để buy back & burn CAKE, từ đó tạo ra hiệu ứng giảm phát token. Việc chuyển đổi mô hình này đã mang đến cho CAKE 23 tháng giảm phát liên tục, loại bỏ đi ~5% nguồn cung.
                  Total supply của CAKE giới hạn ở 450M, cir supply hiện tại khoảng 369M, nếu cứ tiếp tục giữ vững phong độ thì dự án sẽ không bao giờ chạm tới mốc supply 450M.
                  Vậy điểm yếu trong mô hình tokenomic này là gì?
                  Đầu tiên mô hình buy back & burn phụ thuộc vào hiệu quả hoạt động của dự án và BNBChain, giảm phát chỉ thực sự đạt hiệu quả khi nguồn phí thu về đủ lớn để burn vượt qua con số CAKE lạm phát. Nếu CAKE chạm giới hạn total supply tức không mint thêm được CAKE mới thì sẽ không còn cơ chế khuyến khích cho các Liquidity Provider => dẫn đến sụt giảm thanh khoản => sụt giảm volume => lượng burn giảm.
                  Thứ hai là nguồn doanh thu đến từ nhiều loại token, dự án cần quy đổi sang CAKE để burn nên nếu giá CAKE tăng cao cũng dẫn đến hiệu quả burn giảm sút. Mô hình buy back & burn sẽ hiệu quả hơn khi giữ giá CAKE thấp.
                  Cuối cùng lợi ích này trông không đã bằng trả cổ tức tiền mặt vì giá token thường biến động nhiều.
                  Như vậy, mặc dù mô hình giảm phát hoạt động khá hiệu quả nhưng cũng ẩn chứa nhiều biến số.
                </p>
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                <h3>$HYPE #Hyperliquid</h3>

                <p>
                  Hyperliquid là sản Perpdex số 1 hiện nay, luôn nằm trong top doanh thu của bất cứ bảng xếp hạng nào. Mặc dù mới đi vào hoạt động được nửa năm nhưng dự án đã tạo ra ~900 triệu USD phí giao dịch và đặc biệt là chuyển dòng giá trị trị lên tới $835 triệu USD về cho HYPE holder. Nếu ước lượng cả năm thì gấp 5 lần CAKE.
                  Đi sâu vào dòng tiền của Hyperliquid, nguồn doanh thu chủ yếu đến từ phí giao dịch Perp và Spot trên Hypercore, phí đấu giá listing, lợi nhuận từ tiếp nhận vị thế thanh lý. Không có nhiều điểm khác biệt về dòng tiền so với các Perp khác nhưng điều làm HYPE tăng điên cuồng và được cộng đồng ủng hộ nằm ở độ “fair play” của Hyperliquid. Dự án không giữ lại một chút doanh thu nào mà tái xoay vòng toàn bộ vào token HYPE.
                  Phần Perp fee tính bằng USDC chuyển 7.22% cho các LP, phần còn lại 92.78% chuyển tới AF (Assistance Fund) để buy back HYPE định kỳ. Với khối lượng giao dịch khổng lồ trên HL thì lượng HYPE được mua vào liên tục cực nhiều (hiện tại đã mua vào khoảng 2.4% tổng cung) từ đó tạo ra lực đẩy cho đường giá token.
                  Bên cạnh đó, nguồn thu đấu giá listing cũng được đưa vào AF để buy back, lượng phí HYPE thu ở Spot dex thì burn ngay lập tức.
                  Tuy vậy khác với CAKE, phần token được mua vào từ Assistance Fund không được cam kết burn, tương lai dự án có thể sử dụng vào nhiều mục đích khác nhau.
                  Không chỉ “chịu chơi” với tokenomics, ngay trong giai đoạn triển khai dự án cũng đã mạnh tay airdrop số token lên tới hàng tỷ USD cho người dùng sớm. Có thể thấy rằng Hyperliquid rất giàu và rất biêt lấy lòng cộng đồng. Theo phỏng đoán cá nhân thì chiến lượng chịu chơi này sẽ thích hợp nếu dự án sở hữu một lượng lớn token, vì như vậy dòng chảy giá trị buy back sẽ vẫn quay lại với dự án, thêm vào đó tủ lệ dành cho LPs thì phần lớn thanh khoản cũng đến từ dự án. Chiến thuật này giúp dự án vừa có tiếng vừa có miếng.
                  Nhìn chung dù là mô hình giảm phát hay chia sẻ doanh thu thì hiệu suất hoạt động đóng vai trò rất quan trọng. Giá trị doanh thu chia sẻ hoặc buy back & burn phụ thuộc vào volume của dự án. Trong điều kiện môi trường tốt, volume cao, phí tạo ra nhiều thì dự lượng phân bổ lớn, khi dự án hoạt động kém hiệu quả phần doanh thu chia sẻ bị ít đi, token trở nên lạm phát.
                  Hyperliquid có hiệu suất vượt trội do nó lấy mảng perpdex làm trọng tâm, khối lượng giao dịch có đòn bẩy thì luôn gấp hàng chục lần spot, thế nên nguồn doanh thu cũng gấp hàng chục lần. Khi thị trường càng bão hoà, biên độ càng thấp thì các công cụ đòn bẩy càng được sử dụng nhiều, không gian phát triển cho hyperliquid và các sàn perpdex khác còn rất nhiều. Chưa kể đến, sau này các tài sản thực cũng sẽ được token hoá và giao dịch trên dex khiến mảng này trở thành vua chúa doanh thu, những gì bạn thấy ở hiện tại chỉ là khởi đầu.
                  Bullish như vậy không có nghĩa là call buy HYPE nha ae, tầm nhìn thị trường là vậy nhưng các dự án có thể nở rồi tàn, idk.
                  Cuối cùng, trở lại topic của bài viết, các bạn thích tokenomics của dự án nào. Cá nhân mình thì với vai trò là builder mình thích tokenomics của Uniswap nhất, nó tốt cho sự phát triển dài hạn của dự án. Và có thể người kinh doanh sẽ thích tokenomic của Pancake, nhà tài chính sẽ thích tokenomic của Hyperliquid.

                </p>
              </div>

              <div className="mb-2 text-gray-500 dark:text-gray-400">
                <h3>Tellor</h3>
                <p>
                  #TRB (Tellor) là một #oracle phi tập trung, có vai trò kết nối dữ liệu ngoài chuỗi (off-chain) với các blockchain, đặc biệt là #Ethereum. Vai trò của TRB trong thị trường crypto có thể chia thành hai phần: tác động kỹ thuật và tác động tâm lý / dòng tiền.
                </p>
                <p>√  Tác động và tác dụng kỹ thuật của TRB</p>
                <p>  TRB giúp các smart contract nhận được dữ liệu từ thế giới thực như:</p>
                <ul>
                  <li>Giá tài sản (#BTC, #ETH, #Vàng, #USD…)</li>
                  <li>Dữ liệu thời tiết, khí hậu (cho các ứng dụng bảo hiểm)</li>
                  <li> Kết quả thể thao (cho các ứng dụng betting, prediction market)</li>
                  <li>Dữ liệu on-chain (sàn giao dịch, lending protocol)</li>
                </ul>
                <p>🔧 Tác dụng:</p>
                <p>Cung cấp dữ liệu phi tập trung: Không phụ thuộc vào một nguồn duy nhất như Chainlink node, Tellor sử dụng cơ chế staking + mining để xác minh dữ liệu.
                  Chống kiểm duyệt: Do là oracle phi tập trung, không dễ bị thao túng hay dừng hoạt động như một số oracle tập trung.
                  Khả năng mở rộng: Có thể tích hợp với nhiều chain, không chỉ Ethereum (hiện có trên Polygon, Arbitrum, BSC…).</p>
                <p> √ Tác động đến thị trường (tâm lý & dòng tiền)</p>
                <p>📈 Khi TRB pump:</p>
                <p>Tạo hiệu ứng lan tỏa đến các dự án oracle như LINK, DIA, BAND, API3.
                  Kích hoạt sự chú ý của dòng tiền đầu cơ: TRB từng gây FOMO mạnh khi tăng từ ~$10 lên gần $600 trong năm 2023, kéo theo nhiều sóng ăn theo.
                  Tạo kỳ vọng đầu cơ với mô hình “low cap Oracle” - do marketcap nhỏ hơn LINK nhiều lần, TRB thường được coi là “version nghèo của Chainlink” và được kỳ vọng sẽ có sóng mạnh hơn khi dòng tiền về mảng oracle.
                </p>
                <p>TRB thường là chỉ báo sớm cho dòng tiền oracle:</p>
                <p>Nếu TRB bật mạnh → khả năng cao các coin oracle khác cũng được để ý theo sau → giúp nhà đầu tư dự đoán sóng ngành. </p>
                <p>  √  Điểm đặc biệt của TRB</p>
                <p> Cộng đồng đông đảo nhưng “ngầm” - holder lâu dài, ít bị phân phối bởi VC, nhiều whale ôm lâu dài.
                  Cơ chế phân phối khác biệt - không unlock token hàng loạt như các coin có vesting → dễ tạo cú pump khi nguồn cung thấp.
                  Thường bị short mạnh rồi squeeze ngược - tạo các pha tăng sốc rất nhanh, gây ảnh hưởng lớn đến tâm lý thị trường.
                </p>
              </div>




            </div>
          </div>
        </div>




      </div >


    </section >
  );
};

export default Docaccordion;
