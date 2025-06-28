'use client'

import React, { useState, useMemo } from 'react';
import { FaBook, FaCreditCard, FaTrophy, FaShieldAlt, FaStar, FaExclamationTriangle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaHome, FaChevronRight, FaSearch, FaDownload, FaPrint, FaTimes } from 'react-icons/fa';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

const regulations = [
  {
    id: 1,
    title: "Quy Định Về Học Tập",
    icon: FaBook,
    iconColor: "text-blue-600",
    bgColor: "from-blue-50 to-blue-100",
    darkBgColor: "dark:from-blue-900 dark:to-blue-800",
    summary: "Các quy định về thời gian, chuyên cần và thái độ học tập",
    rules: [
      "Học viên phải tham dự đầy đủ các buổi học theo lịch đã được sắp xếp",
      "Thời gian đến lớp: trước giờ học 10 phút để chuẩn bị",
      "Nghỉ học phải báo trước ít nhất 2 tiếng và có lý do chính đáng",
      "Hoàn thành đầy đủ bài tập được giao về nhà đúng hạn",
      "Tích cực tham gia các hoạt động thực hành trong lớp",
      "Không sử dụng điện thoại trong giờ học trừ khi được giáo viên cho phép",
      "Mang theo đầy đủ tài liệu học tập trong mỗi buổi học",
      "Tôn trọng giáo viên và các học viên khác trong lớp"
    ]
  },
  {
    id: 2,
    title: "Quy Định Về Thanh Toán",
    icon: FaCreditCard,
    iconColor: "text-green-600",
    bgColor: "from-green-50 to-green-100",
    darkBgColor: "dark:from-green-900 dark:to-green-800",
    summary: "Chính sách thanh toán học phí và các khoản phí khác",
    rules: [
      "Học phí phải được thanh toán đầy đủ trước khi bắt đầu khóa học",
      "Các khoản phí khác (tài liệu, thi cử) thanh toán theo thông báo",
      "Học viên có thể thanh toán bằng tiền mặt, chuyển khoản hoặc thẻ",
      "Hóa đơn VAT được xuất theo yêu cầu của học viên",
      "Không hoàn trả học phí sau khi đã bắt đầu khóa học quá 7 ngày",
      "Trường hợp đặc biệt sẽ được xem xét riêng theo chính sách của trung tâm",
      "Học viên được giữ chỗ học tối đa 3 ngày sau khi đăng ký",
      "Phí trả chậm: 2% trên tổng số tiền mỗi tuần"
    ]
  },
  {
    id: 3,
    title: "Quy Định Về Thi Cử & Chứng Chỉ",
    icon: FaTrophy,
    iconColor: "text-yellow-600",
    bgColor: "from-yellow-50 to-yellow-100",
    darkBgColor: "dark:from-yellow-900 dark:to-yellow-800",
    summary: "Quy trình đánh giá, thi cử và cấp phát chứng chỉ",
    rules: [
      "Học viên phải đạt tối thiểu 80% số buổi học để được dự thi",
      "Kiểm tra định kỳ bắt buộc sau mỗi unit học",
      "Thi cuối khóa để đánh giá và cấp chứng nhận hoàn thành",
      "Điểm số được thông báo trong vòng 7 ngày làm việc sau khi thi",
      "Học viên có quyền phúc khảo trong vòng 3 ngày sau khi có kết quả",
      "Chứng chỉ được cấp cho học viên đạt yêu cầu về điểm số và chuyên cần",
      "Thi lại được phép tối đa 2 lần với phí thi lại",
      "Chứng chỉ quốc tế có hiệu lực theo chuẩn châu Âu"
    ]
  },
  {
    id: 4,
    title: "Quy Định Về An Toàn & Trật Tự",
    icon: FaShieldAlt,
    iconColor: "text-purple-600",
    bgColor: "from-purple-50 to-purple-100",
    darkBgColor: "dark:from-purple-900 dark:to-purple-800",
    summary: "Đảm bảo môi trường học tập an toàn và văn minh",
    rules: [
      "Giữ gìn vệ sinh chung và không gây tiếng ồn trong khu vực học tập",
      "Trang phục lịch sự, phù hợp với môi trường học tập",
      "Không mang theo đồ uống có cồn hoặc chất kích thích vào trung tâm",
      "Bảo quản tài sản chung và chịu trách nhiệm bồi thường nếu làm hỏng",
      "Tuân thủ các biện pháp an toàn Covid-19 khi có yêu cầu",
      "Báo cáo ngay cho ban quản lý khi phát hiện sự cố bất thường",
      "Không hút thuốc trong khuôn viên trung tâm",
      "Xe máy, ô tô phải đậu đúng nơi quy định"
    ]
  },
  {
    id: 5,
    title: "Quy Định Về Quyền Lợi Học Viên",
    icon: FaStar,
    iconColor: "text-orange-600",
    bgColor: "from-orange-50 to-orange-100",
    darkBgColor: "dark:from-orange-900 dark:to-orange-800",
    summary: "Các quyền lợi và dịch vụ hỗ trợ học viên",
    rules: [
      "Được học bù khi nghỉ có lý do chính đáng và báo trước",
      "Được tư vấn miễn phí về lộ trình học và du học",
      "Được sử dụng tài nguyên học tập (thư viện, phòng tự học)",
      "Được nhận hỗ trợ kỹ thuật và academic mentor",
      "Được tham gia các sự kiện văn hóa và workshop miễn phí",
      "Được bảo mật thông tin cá nhân theo quy định pháp luật",
      "Được ưu đãi học phí cho khóa học tiếp theo",
      "Được hỗ trợ việc làm sau khi hoàn thành khóa học"
    ]
  },
  {
    id: 6,
    title: "Quy Định Về Xử Lý Vi Phạm",
    icon: FaExclamationTriangle,
    iconColor: "text-red-600",
    bgColor: "from-red-50 to-red-100",
    darkBgColor: "dark:from-red-900 dark:to-red-800",
    summary: "Quy trình xử lý vi phạm và hình thức kỷ luật",
    rules: [
      "Vi phạm lần đầu: nhắc nhở bằng lời và ghi nhận",
      "Vi phạm lần hai: cảnh cáo bằng văn bản",
      "Vi phạm nghiêm trọng: đình chỉ học tập có thời hạn 1-2 tuần",
      "Vi phạm rất nghiêm trọng: buộc thôi học không hoàn phí",
      "Mọi quyết định xử lý vi phạm đều được thông báo bằng văn bản",
      "Học viên có quyền khiếu nại và được giải quyết trong 7 ngày làm việc",
      "Có hội đồng kỷ luật để xem xét các trường hợp phức tạp",
      "Quyết định cuối cùng thuộc về Ban Giám đốc trung tâm"
    ]
  }
];

const NoiQuyPage = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Search functionality
  const filteredRegulations = useMemo(() => {
    if (!searchTerm.trim()) return regulations;
    
    return regulations.filter(regulation => {
      const titleMatch = regulation.title.toLowerCase().includes(searchTerm.toLowerCase());
      const summaryMatch = regulation.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const rulesMatch = regulation.rules.some(rule => 
        rule.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return titleMatch || summaryMatch || rulesMatch;
    });
  }, [searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setShowSearchResults(value.trim().length > 0);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSearchResults(false);
  };

  const toggleSection = (sectionId: number) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
    // Smooth scroll to section if expanding
    if (expandedSection !== sectionId) {
      setTimeout(() => {
        const element = document.getElementById(`regulation-${sectionId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  };

  const expandAll = () => {
    setExpandedSection(-1); // Special value to expand all
  };

  const collapseAll = () => {
    setExpandedSection(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 dark:from-gray-900 dark:to-red-900">
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @media print {
          .no-print { display: none !important; }
          .print-break { page-break-after: always; }
        }
      `}</style>
      <Header />
      
      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-4 text-sm">
            <a href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center transition-colors">
              <FaHome className="mr-1" />
              Trang chủ
            </a>
            <FaChevronRight className="text-gray-400 text-xs" />
            <a href="/about" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
              Về chúng tôi
            </a>
            <FaChevronRight className="text-gray-400 text-xs" />
            <span className="text-gray-600 dark:text-gray-300">Nội quy</span>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 via-red-700 to-purple-700 text-white py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            📋 Nội Quy Trung Tâm
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
            Quy định và chính sách để đảm bảo môi trường học tập chuyên nghiệp
          </p>
        </div>
      </section>

      {/* Search and Controls */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Tìm kiếm trong nội quy..."
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 dark:hover:bg-gray-600 rounded-r-lg transition-colors"
                  aria-label="Xóa tìm kiếm"
                >
                  <FaTimes className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3 flex-wrap justify-center lg:justify-end">
              <button
                onClick={expandAll}
                className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 text-sm lg:text-base shadow-sm hover:shadow-md flex items-center"
                aria-label="Mở rộng tất cả sections"
              >
                <FaChevronDown className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Mở rộng </span>tất cả
              </button>
              <button
                onClick={collapseAll}
                className="px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-200 text-sm lg:text-base shadow-sm hover:shadow-md flex items-center"
                aria-label="Thu gọn tất cả sections"
              >
                <FaChevronUp className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Thu gọn </span>tất cả
              </button>
              <button 
                className="px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 text-sm lg:text-base shadow-sm hover:shadow-md flex items-center"
                aria-label="Tải xuống PDF"
              >
                <FaDownload className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">PDF</span>
              </button>
              <button 
                className="px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-200 text-sm lg:text-base shadow-sm hover:shadow-md flex items-center"
                aria-label="In trang"
                onClick={() => window.print()}
              >
                <FaPrint className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">In</span>
              </button>
            </div>
          </div>

          {/* Search Results Info */}
          {showSearchResults && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg animate-fade-in">
              <p className="text-blue-800 dark:text-blue-200 flex items-center">
                <FaSearch className="mr-2" />
                Tìm thấy <strong className="mx-1">{filteredRegulations.length}</strong> kết quả cho "<span className="font-medium">{searchTerm}</span>"
                {filteredRegulations.length === 0 && (
                  <span className="ml-2">😔</span>
                )}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Regulations */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              📝 Chi Tiết Nội Quy
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Các quy định được phân loại theo từng lĩnh vực để dễ dàng tra cứu và áp dụng
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10">
            {filteredRegulations.map((section) => {
              const IconComponent = section.icon;
              const isExpanded = expandedSection === section.id || expandedSection === -1;
              
              return (
                <div
                  key={section.id}
                  id={`regulation-${section.id}`}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 w-full flex flex-col h-fit"
                >
                  {/* Card Header */}
                  <div className={`bg-gradient-to-r ${section.bgColor} ${section.darkBgColor} p-4 lg:p-6 flex-shrink-0`}>
                    <div className="flex items-start justify-between gap-3 lg:gap-4">
                      <div className="flex items-start gap-3 lg:gap-4 flex-1 min-w-0">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                          <IconComponent className={`text-xl lg:text-2xl ${section.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2 lg:mb-3 leading-tight break-words">{section.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed break-words">{section.summary}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="p-2 lg:p-3 hover:bg-white hover:bg-opacity-30 dark:hover:bg-gray-700 dark:hover:bg-opacity-50 rounded-full transition-colors flex-shrink-0"
                        aria-label={isExpanded ? "Thu gọn" : "Mở rộng"}
                      >
                        {isExpanded ? (
                          <FaChevronUp className="text-gray-700 dark:text-gray-300 text-base lg:text-lg" />
                        ) : (
                          <FaChevronDown className="text-gray-700 dark:text-gray-300 text-base lg:text-lg" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className={`flex-1 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none opacity-100' : 'max-h-44 lg:max-h-48 opacity-80'}`}>
                    <div className="p-4 lg:p-6 h-full">
                      <ul className="space-y-3 lg:space-y-4">
                        {(isExpanded ? section.rules : section.rules.slice(0, 3)).map((rule, index) => (
                          <li
                            key={index}
                            className="flex items-start group hover:bg-gray-50 dark:hover:bg-gray-700 p-2 lg:p-3 rounded-lg transition-colors"
                          >
                            <div className="flex-shrink-0 w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-xs lg:text-sm font-bold mr-3 lg:mr-4 mt-0.5 group-hover:scale-110 transition-transform">
                              {index + 1}
                            </div>
                            <span className="text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors flex-1 break-words">
                              {rule}
                            </span>
                          </li>
                        ))}
                      </ul>
                      
                      {!isExpanded && section.rules.length > 3 && (
                        <div className="mt-4 lg:mt-6 text-center border-t border-gray-200 dark:border-gray-600 pt-3 lg:pt-4">
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center mx-auto transition-colors px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 text-sm lg:text-base"
                          >
                            Xem thêm {section.rules.length - 3} quy định <FaChevronDown className="ml-2" />
                          </button>
                        </div>
                      )}

                      {isExpanded && (
                        <div className="mt-4 lg:mt-6 text-center border-t border-gray-200 dark:border-gray-600 pt-3 lg:pt-4">
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 font-medium flex items-center mx-auto transition-colors px-3 lg:px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm lg:text-base"
                          >
                            Thu gọn <FaChevronUp className="ml-2" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {showSearchResults && filteredRegulations.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Không tìm thấy kết quả
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Không có quy định nào phù hợp với từ khóa "{searchTerm}"
              </p>
              <button
                onClick={clearSearch}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Xóa tìm kiếm
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              ❓ Câu Hỏi Thường Gặp
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Những thắc mắc phổ biến về nội quy và chính sách của trung tâm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            {[
              {
                question: "Nếu tôi nghỉ học có lý do bất khả kháng thì sao?",
                answer: "Bạn có thể học bù miễn phí nếu báo trước ít nhất 2 tiếng và có lý do chính đáng. Trung tâm sẽ sắp xếp lịch học bù phù hợp."
              },
              {
                question: "Tôi có thể hoãn thanh toán học phí được không?",
                answer: "Trung tâm cho phép gia hạn thanh toán tối đa 1 tuần với phí phạt 2% mỗi tuần. Trường hợp đặc biệt sẽ được xem xét riêng."
              },
              {
                question: "Điều kiện để được cấp chứng chỉ là gì?",
                answer: "Bạn cần đạt tối thiểu 80% chuyên cần, hoàn thành tất cả bài kiểm tra và đạt điểm tối thiểu trong kỳ thi cuối khóa."
              },
              {
                question: "Nếu vi phạm nội quy sẽ bị xử lý như thế nào?",
                answer: "Tùy vào mức độ vi phạm: nhắc nhở lần đầu, cảnh cáo lần hai, đình chỉ hoặc buộc thôi học với vi phạm nghiêm trọng."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">
                  {faq.question}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-gray-100 to-blue-100 dark:from-gray-700 dark:to-blue-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              💬 Cần Hỗ Trợ Thêm?
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Nếu bạn có bất kỳ câu hỏi nào về các quy định của trung tâm, 
              đừng ngần ngại liên hệ với chúng tôi để được giải đáp chi tiết.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { 
                icon: FaPhone, 
                title: "Điện Thoại", 
                info: "077.024.240", 
                color: "text-green-600", 
                bg: "from-green-50 to-green-100",
                darkBg: "dark:from-green-900 dark:to-green-800",
                action: "Gọi ngay",
                href: "tel:077024240"
              },
              { 
                icon: FaEnvelope, 
                title: "Email", 
                info: "info@dek.edu.vn", 
                color: "text-blue-600", 
                bg: "from-blue-50 to-blue-100",
                darkBg: "dark:from-blue-900 dark:to-blue-800",
                action: "Gửi email",
                href: "mailto:info@dek.edu.vn"
              },
              { 
                icon: FaMapMarkerAlt, 
                title: "Tư Vấn Trực Tiếp", 
                info: "Tại văn phòng trung tâm", 
                color: "text-purple-600", 
                bg: "from-purple-50 to-purple-100",
                darkBg: "dark:from-purple-900 dark:to-purple-800",
                action: "Đến trung tâm",
                href: "/contact"
              }
            ].map((contact, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${contact.bg} ${contact.darkBg} p-6 sm:p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <contact.icon className={`text-2xl sm:text-3xl ${contact.color}`} />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">{contact.title}</h4>
                <p className={`${contact.color} font-semibold text-lg mb-4`}>{contact.info}</p>
                <a
                  href={contact.href}
                  className={`inline-block px-6 py-2 bg-white dark:bg-gray-700 ${contact.color} hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg font-medium transition-all duration-200 hover:scale-105`}
                >
                  {contact.action}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📄 Tải Xuống Nội Quy
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Tải xuống bản PDF đầy đủ để tiện theo dõi và tham khảo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center">
              <FaDownload className="mr-2" />
              Tải PDF Tiếng Việt
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center">
              <FaDownload className="mr-2" />
              Download English PDF
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NoiQuyPage; 