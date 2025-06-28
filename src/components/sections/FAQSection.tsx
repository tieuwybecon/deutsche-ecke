'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaMinus, FaQuestionCircle } from 'react-icons/fa'

const faqs = [
  {
    question: "Deutsche Ecke có uy tín không?",
    answer: "Deutsche Ecke là trung tâm tiếng Đức uy tín #1 tại Việt Nam với hơn 8 năm kinh nghiệm, 5000+ học viên thành công và được công nhận bởi Goethe Institut. Chúng tôi có đội ngũ giáo viên bản ngữ Đức chuyên nghiệp và phương pháp giảng dạy hiện đại."
  },
  {
    question: "Học phí tại Deutsche Ecke bao nhiêu?",
    answer: "Học phí từ 2.5 triệu VND (khóa A1) đến 5.5 triệu VND (khóa B2), bao gồm giáo trình chính thức, chứng chỉ quốc tế và tư vấn du học miễn phí. Chúng tôi có nhiều chương trình ưu đãi và hỗ trợ trả góp cho học viên."
  },
  {
    question: "Có tư vấn du học Đức miễn phí không?",
    answer: "Có, Deutsche Ecke cung cấp dịch vụ tư vấn du học Đức hoàn toàn miễn phí 24/7 cho tất cả học viên. Chúng tôi hỗ trợ từ việc chọn trường, làm hồ sơ đến phỏng vấn visa với tỷ lệ thành công 95%."
  },
  {
    question: "Thời gian học một khóa tiếng Đức là bao lâu?",
    answer: "Thời gian học phụ thuộc vào trình độ: A1 (2-3 tháng), A2 (3-4 tháng), B1 (4-5 tháng), B2 (5-6 tháng). Học viên có thể học linh hoạt với lịch sáng, chiều, tối hoặc cuối tuần theo nhu cầu."
  },
  {
    question: "Có chứng chỉ quốc tế sau khi hoàn thành khóa học không?",
    answer: "Có, sau khi hoàn thành khóa học, học viên sẽ nhận được chứng chỉ tiếng Đức được công nhận quốc tế theo khung tham chiếu châu Âu (CEFR). Chứng chỉ được chấp nhận tại các trường đại học và doanh nghiệp trên toàn thế giới."
  },
  {
    question: "Giáo viên có phải người bản ngữ Đức không?",
    answer: "100% giáo viên tại Deutsche Ecke là người bản ngữ Đức có bằng cấp và chứng chỉ giảng dạy quốc tế. Họ đều có kinh nghiệm sống và làm việc tại Đức, hiểu rõ văn hóa và cách giao tiếp thực tế."
  }
] as const

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaQuestionCircle className="text-3xl text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Câu Hỏi Thường Gặp
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tìm hiểu thêm về Deutsche Ecke và dịch vụ của chúng tôi
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-4"
            >
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <FaMinus className="text-blue-600" />
                    ) : (
                      <FaPlus className="text-gray-400" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-white border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Vẫn còn thắc mắc? Liên hệ với chúng tôi để được tư vấn chi tiết
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary bg-blue-600 hover:bg-blue-700 text-white">
              Liên Hệ Ngay
            </button>
            <button className="btn-secondary border-blue-600 text-blue-600 hover:bg-blue-50">
              Gọi Hotline: 077-024-240
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 