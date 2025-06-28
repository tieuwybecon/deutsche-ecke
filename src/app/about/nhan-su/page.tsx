'use client'

import React, { useState } from 'react';
import { FaEnvelope, FaUser, FaStar, FaPhone, FaGraduationCap, FaLinkedin, FaAward, FaLanguage, FaBookOpen, FaEye, FaEyeSlash, FaHome, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

const NhanSuPage = () => {
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  const teamMembers = [
    {
      id: 1,
      name: "AN SƠN ĐỨC",
      position: "Giám đốc & Giáo viên",
      description: "Hallo! Mình là Đức - một chàng trai từ Hưng Yên đã \"ăn nằm\" với tiếng Đức 10+ năm. Ban đầu chỉ vì... cần tiền thôi 😅 Nhưng thấy môi trường dạy tiếng Đức ở VN còn nhiều \"chưa ưng\", thôi về mở lớp luôn! Công việc giảng dạy đã mang lại cho mình rất nhiều niềm vui và nơi thoải mái sáng tạo.",
      qualifications: [
        "🎓 Cử nhân chuyên ngành Ngữ Văn Đức tại Đại học Khoa Học Xã Hội và Nhân Văn, Tp.HCM",
        "📚 Từng học thạc sĩ chuyên ngành Germanistik als Fremdsprachenphilologie tại Đại học Würzburg",
        "🏆 Tốt nghiệp khóa học Methodik (Giáo học pháp - phương pháp giảng dạy tiếng Đức) tại viện Goethe HCM"
      ],
      email: "director@dek.edu.vn",
      phone: "077.024.240",
      specialties: ["Tham gia giảng dạy tiếng Đức trình độ A1-B2 từ 2018", "Du học & Làm việc tại Đức", "Phương pháp giảng dạy hiện đại", "Tư vấn du học Đức"],
      avatar: "🎯",
      image: "/images/team/director.jpg",
      achievements: [
        "🌟 Mỗi sáng bật dậy nhớ ra là hôm nay mình có lớp cần dạy với mình là thành tựu rồi đó :)",
        "🏅 10+ năm kinh nghiệm học tập và làm việc tại Đức",
        "📈 Xây dựng Deutsche Ecke từ 2019 với triết lý \"học bằng đam mê, không bằng áp lực\""
      ],
      languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Đức (C2)", "Tiếng Anh (B2)"],
      bio: "Tính mình đôi lúc cục súc nhưng phần lớn thời gian là hay cười và cũng may là nói chuyện không quá chán 😄 Mình tuy hướng nội full time nhưng buộc phải hướng ngoại part time vì muốn xây dựng nên một môi trường học thân thiện thoải mái, không áp lực. Muốn các bạn học tiếng Đức bằng sự đam mê chứ không phải vì bị tuyển sinh lừa hay gia đình định hướng. Deutsche Ecke - một góc nhỏ để tất cả những ai cùng chung quan điểm có thể tự do thoải mái đến với tiếng Đức, cái thứ ngôn ngữ khó nhằn mà chúng ta cần nắm vững để có được \"cuộc sống màu hồng\" 🌈",
      testimonial: "Thầy Đức rất hài hước và tạo không khí học tập thoải mái. Nhờ thầy mà em đã yêu thích tiếng Đức và có động lực du học!"
    },
    {
      id: 2,
      name: "NGUYỄN THỊ QUỲNH PHƯƠNG",
      position: "Giáo viên",
      description: "Hallo các bạn, cô là Phương - cô gái đến từ Nha Trang! 🌊 Đối với cô, việc học phải nghiêm túc và phải thưởng xuyên làm bài tập cũng như cũng có kiến thức thật nhiều để không quên. Phương châm của cô là: \"Không có việc gì khó, chỉ sợ là bài tập không đủ.\" 😄",
      qualifications: [
        "🎓 Tốt nghiệp Cử nhân chuyên ngành Ngữ Văn Đức tại Đại học Khoa học Xã hội và Nhân văn, Tp.HCM"
      ],
      email: "phuong@dek.edu.vn",
      phone: "077.024.241",
      specialties: ["Từng bắt đầu giảng dạy từ năm 2013", "Chuyên phụ trách các lớp tiếng Đức từ trình độ A1 đến B2", "Phương pháp học nghiêm túc"],
      avatar: "🌊",
      image: "/images/team/phuong.jpg",
      achievements: [
        "💪 Hiện đang có công việc ổn định và gia đình hạnh phúc là thành tựu lớn nhất rồi nha!",
        "📚 7+ năm kinh nghiệm giảng dạy tiếng Đức",
        "🎯 Chuyên gia về phương pháp luyện tập cường độ cao"
      ],
      languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Đức (C1)", "Tiếng Anh (B2)"],
      bio: "Nên khi học với cô, các bạn xác định sẽ đánh đổi những thời gian đi chơi hay lướt điện thoại bằng những khoảng thời gian nai lưng trên bàn và căng mắt mà làm bài tập. Trên lớp, cô cũng mong các bạn hoàn toàn tập trung và nghiêm túc học tập 100%. Nên là bạn nào học với cô thì không được cà rỡn đâu nhé! 😊",
      testimonial: "Cô Phương dạy rất kỹ và yêu cầu chúng em phải chăm chỉ. Nhờ cô mà em có nền tảng tiếng Đức vững chắc!"
    },
    {
      id: 3,
      name: "NGUYỄN LÊ THẢO MY",
      position: "Giáo viên",
      description: "Xin chào cả nhà! 👋 Cô là My, một người hết sức xi teen nhưng hướng nội điển hình. Rất ham vui nhưng thôi đừng vui quá nhèn. Cô đã đi dạy cũng được hơn 5 năm rồi, đối với cô, lớp học phải vui và phải tràn đầy năng lượng, vì cô không phải là kiểu người thích sự gò bó và khuôn khổ. 🌈",
      qualifications: [
        "🎓 Tốt nghiệp Cử nhân chuyên ngành Ngữ Văn Đức tại Đại học Khoa học Xã hội và Nhân văn, Tp.HCM"
      ],
      email: "my@dek.edu.vn",
      phone: "077.024.248",
      specialties: ["Giảng dạy từ năm 2020", "Chuyên dạy và luyện thi tiếng Đức từ trình độ A1 đến B1", "Phương pháp học vui vẻ và tương tác"],
      avatar: "🌈",
      image: "/images/team/my.jpg",
      achievements: [
        "🎨 Cô thích kiểu tự do khám phá, tự tìm hiểu ngôn ngữ mới thông qua những trò chơi hay những thông tin mình tự tìm kiếm được",
        "💫 5+ năm kinh nghiệm tạo không khí học tập vui vẻ",
        "🎯 Chuyên gia học tiếng Đức qua trải nghiệm thực tế"
      ],
      languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Đức (B2)", "Tiếng Anh (B2)"],
      bio: "Phương châm của cô là \"mỗi ngày đến lớp là một ngày vui\" nên khi học mình sẽ ở một môi trường vừa chơi vừa học, học mà chơi - miễn sao mọi người nắm được kiến thức chắc nhất. Xuxa khi cô học tiếng Đức và cũng giống như mọi người có thấy tiếng Đức khó đỡ lắm, thần kỳ sao cô lại bén duyên với nghề nhà giáo này, vì thế cô mong muốn có thể giúp mọi người vượt qua được khó khăn này như cách ngày xưa cô đã làm. À mà tối đây thì cô hết biết nói gì thêm rồi. Nếu có duyên học với cô, thì chúng ta sẽ tìm hiểu nhau nhiều hơn nhé! 🎉",
      testimonial: "Cô My dạy rất vui và tạo không khí học tập thoải mái. Lớp học của cô luôn đầy tiếng cười!"
    },
    {
      id: 4,
      name: "TRẦN HUỲNH BẢO KHÁNH",
      position: "Giáo viên",
      description: "Chào các bạn! 👋 Mình là Trần Huỳnh Bảo Khánh và đã giảng dạy tiếng Đức từ cuối năm 2019 đến giờ. Mình rất thích nghiêm cứu ngôn ngữ nên bên cạnh dạy tiếng Đức mình còn dạy thêm tiếng Việt cho người nước ngoài. Hiện mình đang không ở Việt Nam nhưng sẽ sớm quay lại quê nhà để tiếp tục công cuộc giúp đỡ các bạn qua Đức. Hẹn sớm gặp các bạn học viên nhé! 🇩🇪",
      qualifications: [
        "🎓 Tốt nghiệp Cử nhân ngành Ngữ Văn Đức tại Đại học Khoa học Xã hội và Nhân văn, TP.HCM",
        "📚 Đang học thạc sĩ tại Đại Loan"
      ],
      email: "khanh@dek.edu.vn",
      phone: "077.024.243",
      specialties: ["Bắt đầu giảng dạy tiếng Đức từ năm 2019", "Chuyên giảng dạy cho các lớp từ A1 đến B1", "Nghiên cứu ngôn ngữ học"],
      avatar: "🎓",
      image: "/images/team/khanh.jpg",
      achievements: [
        "📖 Mình đang làm đúng theo lời dạy \"học, học nữa, học mãi\"",
        "🌏 Mình vẫn đang có gắng học hỏi mỗi ngày, thì các bạn cũng có thể nhỉ",
        "🎯 Chuyên gia song ngữ Đức-Việt"
      ],
      languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Đức (C1)", "Tiếng Anh (B2)", "Tiếng Trung (HSK3)"],
      bio: "Mình rất thích nghiêm cứu ngôn ngữ nên bên cạnh dạy tiếng Đức mình còn dạy thêm tiếng Việt cho người nước ngoài. Hiện mình đang không ở Việt Nam nhưng sẽ sớm quay lại quê nhà để tiếp tục công cuộc giúp đỡ các bạn qua Đức. Với phương pháp dạy theo kiểu \"học, học nữa, học mãi\", mình tin rằng mọi khó khăn đều có thể vượt qua! 💪",
      testimonial: "Thầy Khánh dạy rất tâm huyết và luôn khuyến khích chúng em không ngừng học hỏi. Cảm ơn thầy!"
    },
    {
      id: 5,
      name: "TRẦN THỊ LỆ HẢI",
      position: "Giáo viên",
      description: "Hallihallo! 👋 Mình là Hải. Với mình, học tiếng Đức không chỉ là học một ngôn ngữ, mà còn là một hành trình hướng tới một mục tiêu lớn hơn – có thể là du học, làm việc hay định cư tại Đức. Vì vậy, điều quan trọng nhất trước khi vào lớp học là bạn cần xác định mục tiêu rõ ràng với tiếng Đức và nước Đức. 🎯",
      qualifications: [
        "🎓 Tốt nghiệp Cử nhân ngành CNTT tại Technische Universität Berlin, Đức",
        "📚 Tốt nghiệp khóa học Methodik tại viện Goethe"
      ],
      email: "hai@dek.edu.vn",
      phone: "077.024.244",
      specialties: ["Bắt đầu giảng dạy từ năm 2021", "Chuyên phụ trách các lớp tiếng Đức từ trình độ A1 đến B2", "Kinh nghiệm luyện thi các dạng đề B1 (Telc, Goethe...)"],
      avatar: "🌟",
      image: "/images/team/hai.jpg",
      achievements: [
        "🏠 Hạnh phúc ở nhà, vui vẻ trên lớp",
        "🎓 Tốt nghiệp Đại học Kỹ thuật Berlin",
        "💫 Chuyên gia tư vấn định hướng du học Đức"
      ],
      languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Đức (C2)", "Tiếng Anh (B2)"],
      bio: "Mình tin rằng việc học tiếng Đức có thể vui, nhưng cũng cần sự chăm chỉ và kiên trì. Trên lớp, các bạn nên chú ý lắng nghe, tích cực tham gia bài học. Ở nhà, các bạn cần ôn tập thường xuyên, làm bài tập đầy đủ và luyện thêm kỹ năng. Mình luôn nhắc học viên rằng: \"Học là một quá trình – không phải chạy nước rút, mà là chạy đường dài.\" 🏃‍♀️💨",
      testimonial: "Cô Hải dạy rất có tâm và luôn tạo động lực cho chúng em. Nhờ cô mà em đã vượt qua được kỳ thi B1!"
    },
    {
      id: 6,
      name: "VÕ QUANG TRUNG",
      position: "Giáo viên",
      description: "Hallo hallo mọi người! 👋 Mình là Trung, gọi là thầy vậy thôi chứ mình cũng thuộc team Gen Z nên cũng ham vui lắm. Phương châm của mình là học phải tự giác, không biết thì phải hỏi, phải tự tìm tòi và sáng tạo. Hồi trước khi mình học ngôn ngữ thì sau thời gian trên lớp, đại đa số thời gian còn lại là tự mình tìm hiểu thêm và tự học thêm. 📚",
      qualifications: [
        "🎓 (Học vấn sẽ được cập nhật)"
      ],
      email: "trung@dek.edu.vn",
      phone: "077.024.245",
      specialties: ["Bắt đầu giảng dạy tiếng Đức từ năm 2023", "Chuyên giảng dạy cho các lớp từ A1 đến B1", "Phương pháp tự học hiệu quả"],
      avatar: "🎮",
      image: "/images/team/trung.jpg",
      achievements: [
        "🎯 Đại diện thế hệ Gen Z năng động",
        "💡 Chuyên gia phương pháp tự học",
        "🤝 Cầu nối gần gũi với học viên trẻ"
      ],
      languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Đức (C1)", "Tiếng Anh (B2)"],
      bio: "Dĩ nhiên, thầy cô cũng đóng vai trò cực kỳ quan trọng trong việc định hướng và sửa lỗi, nhưng rõ ràng việc bản thân tự giác học lúc nào cũng sẽ tốt hơn rất nhiều so với việc học thu động như vậy. Nên các bạn học với mình thì hãy sẵn sàng một tinh thần luôn luôn tự tìm tòi, tự phát triển, tự đặt ra câu hỏi tại sao. Và mình sẽ là người đồng hành hướng dẫn cho các bạn và sẽ giải đáp thắc mắc cho các bạn! 🚀",
      testimonial: "Thầy Trung rất gần gũi và hiểu tâm lý học viên. Cách dạy của thầy giúp em tự tin hơn trong việc tự học!"
    },
    {
      id: 7,
      name: "NGUYỄN THỊ HÀ",
      position: "Giáo viên",
      description: "Mình là Hà, giáo viên của trung tâm Deutsche Ecke! 🌸 Mình là một người khá khép kín nên cũng không biết chia sẻ như thế nào. Thôi thì là vậy, đối với mình thì việc học phải kiên trì và kiên nhẫn. Với mình thì không có việc gì khó, cái khó là chúng ta không thể duy trì, không thể kiên nhẫn. 💪",
      qualifications: [
        "🎓 Tốt nghiệp Đại học Y Huế"
      ],
      email: "ha@dek.edu.vn",
      phone: "077.024.246",
      specialties: ["Bắt đầu giảng dạy tiếng Đức từ năm 2024", "Chuyên giảng dạy cho các lớp từ A1 đến A2", "Phương pháp học kiên trì"],
      avatar: "🌸",
      image: "/images/team/ha.jpg",
      achievements: [
        "🏥 Từ một học viên tham gia lớp học vô lòng rồi trở thành đồng nghiệp với những giáo viên của mình",
        "💪 Chuyên gia về tinh thần kiên trì và không bỏ cuộc",
        "🎯 Ai xem đó là thành tựu chứ với bản thân mình nó là kỳ tích luôn"
      ],
      languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Đức (B2)", "Tiếng Anh (B1)"],
      bio: "Mình cũ âm thầm nỗ lực, âm thầm có gắng từng ngày, từng giờ. Hôm nay không nhớ thì hôm sau học lại sẽ nhớ, hôm sau học lại vẫn không nhớ thì tiếp tục học đến khi nào nhớ thì thôi. Chúng ta có thể đi chậm, nhưng tuyệt đối đừng dừng yên học tụt lại phía sau! 🌟",
      testimonial: "Cô Hà rất kiên nhẫn và luôn động viên chúng em. Nhờ cô mà em hiểu rằng kiên trì sẽ thành công!"
    },{
      id: 8,
      name: "NGUYỄN QUỲNH NHƯ",
      position: "Giáo viên",
      description: "Hallo zusammen! 👋 Mình là Như và đã gắn bó với công việc dạy tiếng Đức được khoảng 5 năm rồi. Việc học tiếng Đức không chỉ là một thử thách đối với học viên mà còn là với cả mình nữa, vì vậy mình luôn có gắng để tạo ra một bầu không khí học tập thoải mái, vui vẻ và khuyến khích các bạn nói thật nhiều để tự tin hơn với tiếng Đức.",
      qualifications: [
        "🎓 Tốt nghiệp Cử nhân ngành Ngữ Văn Đức tại Đại học Khoa học Xã hội và Nhân văn, TP.HCM"
      ],
      email: "nhu@dek.edu.vn",
      phone: "077.024.242",
      specialties: ["Bắt đầu giảng dạy tiếng Đức từ năm 2021", "Chuyên giảng dạy cho các lớp từ A1 đến B1", "Tạo không khí học tập vui vẻ"],
      avatar: "💫",
      image: "/images/team/nhu.jpg",
      achievements: [
        "🌟 Tốt Nghiệp Đại Học Nhân Văn",
        "🎯 5 năm kinh nghiệm giảng dạy với phương pháp tương tác",
        "💝 Được học viên yêu thích vì phong cách dạy năng động"
      ],
      languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Đức (C1)", "Tiếng Anh (B2)"],
      bio: "Vì tiếng Đức không chỉ là những bài học nhàm chán, mà còn là con đường để các bạn phát triển bản thân và tìm hiểu văn hóa của nước Đức. Hy vọng mình sẽ có cơ hội đồng hành cùng các bạn học viên trên hành trình chinh phục tiếng Đức! 🚀",
      testimonial: "Cô Như dạy rất nhiệt tình và luôn tạo không khí vui vẻ trong lớp. Em rất thích cách cô giảng bài!"
    },
     {
      id: 9,
      name: "NGUYỄN NGỌC PHƯƠNG ÂN",
      position: "Giáo viên",
      description: "Xin chào! 👋 Mình là Phương Ân, giáo viên tiếng Đức tại trung tâm Deutsche Ecke. Mình yêu thích việc học ngoại ngữ từ nhỏ và luôn ước mơ được trải nghiệm cuộc sống, học tập ở nước ngoài. May mắn là mình đã có cơ hội du học tại Đức trong 5 năm và khoảng thời gian đó đã mang lại cho mình rất nhiều trải nghiệm quý giá. 🇩🇪",
      qualifications: [
        "🎓 Tốt nghiệp Cử nhân ngành Kinh tế Đức, có được trang bị kiến thức toàn diện về kinh tế và ngôn ngữ"
      ],
      email: "phuongan@dek.edu.vn",
      phone: "077.024.250",
      specialties: ["Bắt đầu giảng dạy tiếng Đức từ năm 2023", "Chuyên giảng dạy cho các lớp từ A1 đến B1", "Kinh nghiệm du học Đức thực tế"],
      avatar: "🌍",
      image: "/images/team/phuongan.jpg",
      achievements: [
        "🎓 5 năm du học tại Đức với nhiều trải nghiệm quý giá",
        "💼 Chuyên gia kết hợp Kinh tế và Ngôn ngữ Đức",
        "🌟 Chia sẻ kinh nghiệm thực tế về cuộc sống tại Đức"
      ],
      languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Đức (C1)", "Tiếng Anh (B2)"],
      bio: "Với mong muốn chia sẻ lại những điều mình đã học được cũng như truyền cảm hứng cho các bạn trẻ đang theo đuổi ước mơ du học, mình chọn trở thành giáo viên tiếng Đức. Trong mỗi buổi học, mình luôn cố gắng tạo ra một môi trường thoải mái, gần gũi những vấn đáp hiệu quả. Vì mình hy vọng các bạn không chỉ học tốt ngôn ngữ mà còn thêm tự tin khi sử dụng tiếng Đức trong giao tiếp thực tế. Ngôn ngữ chính là một chiếc chìa khóa quan trọng để hòa nhập và mở ra nhiều cơ hội trong cuộc sống, mình tin như vậy! 🗝️✨",
      testimonial: "Cô Phương Ân có nhiều kinh nghiệm thực tế tại Đức và luôn chia sẻ những câu chuyện thú vị. Rất hữu ích!"
    },{
      id: 10 ,
      name: "NGUYỄN TRẦN HOÀNG THIỆN",
      position: "\"Dám Đốc Thiện\"",
      description: "Xin chào! 👋 Mình được ưu ái đặt nickname là \"Dám Đốc Thiện\" của trung tâm. Mình từng theo học tiếng Đức tại Deutsche Ecke một thời gian, may mắn sau đó được thầy cô phát hiện về \"nước Đức màu hồng\", mình đã quyết định... ở lại Việt Nam, cưới vợ, phụng dưỡng mẹ và tìm người đi thay 😄",
      qualifications: [
        "🎓 (Thông tin học vấn sẽ được cập nhật)"
      ],
      email: "thien@dek.edu.vn",
      phone: "077.024.247",
      specialties: ["Quản lý và chăm sóc học viên", "Tư vấn du học", "Hỗ trợ administrative"],
      avatar: "😈",
      image: "/images/team/thien.jpg",
      achievements: [
        "🎭 Từ ban đầu đồng học phí để vào học, giờ trung tâm đang phải trả tiền cho mình hàng tháng để mình học tập và làm việc ở đây",
        "💝 Hập dẫn không :D",
        "🏠 Chọn tình yêu và gia đình thay vì du học"
      ],
      languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Đức (B1)", "Tiếng Anh (B2)"],
      bio: "Với hơn 3 năm kinh nghiệm quản lý, hiện mình đang phụ trách quản lý và chăm sóc học viên tại Deutsche Ecke. Một số bạn chưa tiếp xúc sẽ thấy mình cực xúc lắm. Nhưng mà, bạn có nhớ người ta hay dẫn \"đúng đánh giá một quyển sách qua trang bìa\" chứ? Chỉ cần có duyên bạn sẽ được khám phá con người thật của mình \"thiên lành\" đúng như cái tên của mình. Bạn đến đây chỉ mài chơi và không học thì mình sẽ \"độc\" cho bạn học :) 😜",
      testimonial: "Anh Thiên tuy có vẻ nghiêm khắc nhưng rất quan tâm và hỗ trợ học viên nhiệt tình. Cảm ơn anh!"
    },
    {
      id: 11,
      name: "PHAN HOÀNG NGỌC",
      position: "Mầm non trợ giảng",
      description: "Hallo mọi người! 👋 Mình tên là Hoàng Ngọc, được mọi người biết đến với vai trò là trợ giảng mới nhú của DEK. Có thể mấy nỉ chưa biết, mình cũng từng là một cậu học sinh ngây thơ, vô tội từng bị lừa vào con đường học tiếng Đức tại chính trung tâm mà mình đã và \"đang\" tác nghiệp, tức Deutsche Ecke. 😅",
      qualifications: [
        "🌱 Xuất sắc 3 năm mầu giáo",
        "🎓 Học sinh giỏi, ưu tú và gương mẫu suốt 12 năm đi học"
      ],
      email: "ngoc@dek.edu.vn",
      phone: "077.024.249",
      specialties: ["Tham gia trợ giảng, giảng dạy từ trình độ A1-A2", "Thỉnh thoảng B1", "Năng lượng tuổi trẻ"],
      avatar: "🌱",
      image: "/images/team/ngoc.jpg",
      achievements: [
        "🍼 Ăn nhở ngũ đậu tại DEK 2 năm",
        "👨‍🍳 Cánh tay giữa đặc lực của Chef",
        "🎯 Từ học viên thành trợ giảng trong thời gian kỷ lục"
      ],
      languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Đức (B1)", "Tiếng Anh (B2)"],
      bio: "Mình may mắn được tiếp xúc và được giảng dạy bởi hầu như tất thấy các giáo viên tại đây, nhận được sự điều đặt tận tâm của đội ngũ giáo viên đã giúp mình tiếp thu tiếng Đức một cách hiệu quả. Đồng ý là ý thức tự học vẫn đóng một vai trò rất yếu trong quá trình học, NHƯNG không thấy thì đó mấy làm nên. Đến thời điểm hiện tại thì mình đã lún sâu vào cam bẫy, đang sinh sống và học nghề tại nước Đức màu hương sau khi chính thức bị lừa. Viết đến đây thì cô vể cũng đã khá dài, thôi thi, đừng để bị lừa như mình nhé các bạn! 🤣",
      testimonial: "Anh Ngọc rất gần gũi và hiểu tâm lý học viên. Từ học viên thành trợ giảng, anh là tấm gương tuyệt vời!"
    },
    {
      id: 12,
      name: "PHÙNG THANH DUY",
      position: "Thợ Đụng ( đụng gì cũng làm )",
      description: "Xin chào cả nhà, mình là Duy, một người đầy sức sống và năng lượng. Mình đã từng là một học sinh tại trung tâm Deutsche Ecke, và sau đó trở thành một anh thợ đụng tại trung tâm, từ tham gia trợ giảng, đến trét tường, giữ xe, dọn dẹp, in tài liệu, thiết kế, MC, và còn nhiều điều nữa. ",
      qualifications: [
        "🎓 Đạt loại giỏi trong việc yêu thương gia đình",
        "👨‍🍳 Tốt nghiệp mẫu giáo loại bé khỏe bé ngoan"
      ],
      email: "thanhbao1609@gmail.com",
      phone: "0923.411.363363",
      specialties: ["Trợ giảng trình độ A1 thỉnh thoảng A2", "Thiết kế lập trình nội dung website của Deutsche Ecke", "Thợ Đụng ( đụng gì cũng làm )"],
      avatar: "🌈",
      image: "/images/team/duy.jpg",
      achievements: [
        "🎨 Mình là một người đầy sức sống và năng lượng, luôn tìm kiếm các cơ hội để phát triển bản thân và góp phần vào sự phát triển của trung tâm",
        "💫 Mình có kinh nghiệm làm việc trong nhiều lĩnh vực khác nhau, từ thiết kế lập trình nội dung website đến thợ đụng ( đụng gì cũng làm )",
        "🎯 Mình có khả năng làm việc độc lập và đồng thời làm việc nhóm, đặc biệt là trong môi trường cạnh tranh và cần phải đạt được kết quả cao"
      ],
      languages: ["Tiếng Việt (Bản ngữ)", "Tiếng Đức (B1)", "Tiếng Anh (Giao tiếp)"],
      bio: "Kim chỉ nam của mình là không có việc gì khó, miễn mình còn thở là được",
      testimonial: "Anh Duy là một người đầy sức sống, và siêu nhiệt tình với các học viên."
    },
  ];

  const toggleExpanded = (memberId: number) => {
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <Header />
      
      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-4 text-sm">
            <a href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
              <FaHome className="mr-1" />
              Trang chủ
            </a>
            <FaChevronRight className="text-gray-400 text-xs" />
            <a href="/about" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              Về chúng tôi
            </a>
            <FaChevronRight className="text-gray-400 text-xs" />
            <span className="text-gray-600 dark:text-gray-300">Nhân sự</span>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Đội Ngũ Nhân Sự
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
            Gặp gỡ đội ngũ giáo viên và chuyên gia tận tâm của Deutsche Ecke
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Lòng Vòng Về Chúng Mình
            </h2>
            </div>
            
            <div className="max-w-5xl mx-auto space-y-8">
              {/* Phần giới thiệu chính */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 text-center">
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Nghe thôi đã thấy <span className="font-semibold text-blue-600 dark:text-blue-400">"mùi du học"</span> thâm phức rồi các bạn ơi! 
                  Giữa cái nắng "cháy mỡ" của Sài Gòn, có một <span className="font-semibold text-purple-600 dark:text-purple-400">"góc nhà bình yên"</span> tiếng Đức 
                  mang tên <strong className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Deutsche Ecke</strong> đã âm thầm "bám trụ" từ cuối năm 2019.
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400 italic">
                  Nghe cái tên thôi đã thấy "chuẩn Đức" như kiểu "Góc Đức" phiên bản tri thức ấy nhỉ! 😊
                </p>
              </div>

              {/* Grid phần thông tin chính */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border-l-4 border-blue-500 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Đội Ngũ Chuyên Nghiệp
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Mấy anh chị sáng lập trung tâm mang cái nhìn là <em>"dân chuyên hệ Đức"</em> thật thụ, 
                    "ăn nằm" bên bển lâu đến "tẩm nhuần" từng công tra vị chuẩn mực của ngữ pháp và văn hóa Đức.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border-l-4 border-purple-500 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mr-4">
                      <span className="text-2xl">🔥</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Truyền Lửa Đam Mê
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Với kinh nghiệm "xương máu" du học, các anh chị quyết tâm "xách vali" về Sài Gòn 
                    "truyền lửa", mang đến một làn gió mới cho phong trào học tiếng Đức.
                  </p>
                </div>
              </div>

              {/* Phần đặc biệt */}
              <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  🌟 Điều Đặc Biệt Tại Deutsche Ecke
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">📚</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      Không chỉ học ngữ pháp và kiểm tra điểm số, mà còn được "lấy" những luồng sinh động 
                      "chất giáo" tận nơi bên Đức.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">🎨</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      Tâm hồn của giáo viên là "nghệ thuật" chạm đến trái tim – truyền động lực cho bạn 
                      "lên level" như một đứa cháy hết mình.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">🏛️</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      Các thầy cô còn "bonus" thêm cho các bạn một loạt kiến thức về văn hoá, lịch sử Đức nữa đó!
                    </p>
                  </div>
                </div>
              </div>

              {/* Kết luận */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-3xl p-8 text-center border border-orange-100 dark:border-orange-800">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
                    <span className="mr-3">💫</span>
                    Tại Sao Chọn Deutsche Ecke?
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <strong>Deutsche Ecke</strong> không chỉ là một trung tâm tiếng Đức "bình thường", 
                    mà là nơi bạn có thể <span className="text-orange-600 dark:text-orange-400 font-semibold">"định trọn thanh xuân"</span> 
                    cho đam mê với tiếng Đức.
                  </p>
                  <p className="text-base text-gray-600 dark:text-gray-400 italic">
                    Biết đâu bạn lại tìm được "đồng bọn" cùng nhau "vượt vũ môn" sang trời Âu thì sao! 😉
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 mx-auto w-full max-w-md"
              >
                {/* Member Image */}
                <div className="relative h-56 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-800 dark:to-purple-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-white"
                        onError={(e) => {
                          // Fallback to avatar emoji if image fails to load
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div 
                      className="w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-700 dark:to-purple-700 rounded-full flex items-center justify-center text-7xl shadow-lg"
                      style={{ display: member.image ? 'none' : 'flex' }}
                    >
                      {member.avatar}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {member.position}
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{member.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{member.description}</p>
                  </div>
                  
                  {/* Qualifications */}
                  <div className="mb-5">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <FaGraduationCap className="text-blue-500 mr-2 flex-shrink-0" />
                      Bằng cấp:
                    </h4>
                    <div className="space-y-2">
                      {member.qualifications.slice(0, 2).map((qual, index) => (
                        <div
                          key={index}
                          className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-2 rounded-lg text-sm leading-relaxed"
                        >
                          {qual}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Specialties */}
                  <div className="mb-5">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <FaStar className="text-yellow-500 mr-2 flex-shrink-0" />
                      Chuyên môn:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-5">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <FaLanguage className="text-purple-500 mr-2 flex-shrink-0" />
                      Ngôn ngữ:
                    </h4>
                    <div className="space-y-1">
                      {member.languages.slice(0, 2).map((lang, index) => (
                        <div
                          key={index}
                          className="text-sm text-gray-600 dark:text-gray-300"
                        >
                          • {lang}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedMember === member.id && (
                    <div className="mb-5 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-5">
                      {/* Bio */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <FaBookOpen className="text-indigo-500 mr-2 flex-shrink-0" />
                          Giới thiệu:
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{member.bio}</p>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <FaAward className="text-orange-500 mr-2 flex-shrink-0" />
                          Thành tích:
                        </h4>
                        <div className="space-y-2">
                          {member.achievements.map((achievement, index) => (
                            <div
                              key={index}
                              className="bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-3 py-2 rounded-lg text-sm leading-relaxed"
                            >
                              🏆 {achievement}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* All Languages */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <FaLanguage className="text-purple-500 mr-2 flex-shrink-0" />
                          Tất cả ngôn ngữ:
                        </h4>
                        <div className="space-y-1">
                          {member.languages.map((lang, index) => (
                            <div
                              key={index}
                              className="text-sm text-gray-600 dark:text-gray-300"
                            >
                              • {lang}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* All Qualifications */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <FaGraduationCap className="text-blue-500 mr-2 flex-shrink-0" />
                          Tất cả bằng cấp:
                        </h4>
                        <div className="space-y-2">
                          {member.qualifications.map((qual, index) => (
                            <div
                              key={index}
                              className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-2 rounded-lg text-sm leading-relaxed"
                            >
                              {qual}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Expand/Collapse Button */}
                  <div className="mb-5">
                    <button
                      onClick={() => toggleExpanded(member.id)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                      aria-label={expandedMember === member.id ? "Thu gọn thông tin" : "Xem thêm thông tin"}
                    >
                      {expandedMember === member.id ? (
                        <>
                          <FaEyeSlash className="mr-2" />
                          Thu gọn
                        </>
                      ) : (
                        <>
                          <FaEye className="mr-2" />
                          Xem thêm
                        </>
                      )}
                    </button>
                  </div>

                  {/* Contact Info */}
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-5 space-y-3">
                    <a 
                      href={`mailto:${member.email}`}
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                      aria-label={`Gửi email cho ${member.name}`}
                    >
                      <FaEnvelope className="mr-3 flex-shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </a>
                    <a 
                      href={`tel:${member.phone}`}
                      className="flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium transition-colors duration-200"
                      aria-label={`Gọi điện cho ${member.name}`}
                    >
                      <FaPhone className="mr-3 flex-shrink-0" />
                      {member.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">15+</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Năm kinh nghiệm</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-2">500+</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Học viên đã tốt nghiệp</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">98%</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Tỷ lệ đỗ chứng chỉ</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">4.9/5</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Đánh giá học viên</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Học Viên Nói Gì Về Đội Ngũ
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Những chia sẻ chân thực từ học viên về giáo viên của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={`testimonial-${member.id}`}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <FaQuoteLeft className="text-blue-500 text-2xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300 italic mb-4 leading-relaxed">
                      "{member.testimonial}"
                    </p>
                    <div className="flex items-center space-x-3">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-8 h-8 rounded-full object-cover border-2 border-blue-200"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                            if (nextElement) {
                              nextElement.style.display = 'flex';
                            }
                          }}
                        />
                      ) : null}
                      <div 
                        className="w-8 h-8 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-700 dark:to-purple-700 rounded-full flex items-center justify-center text-lg"
                        style={{ display: member.image ? 'none' : 'flex' }}
                      >
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          Về {member.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {member.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Sẵn Sàng Học Cùng Đội Ngũ Chuyên Nghiệp?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Tham gia cùng hàng trăm học viên đã thành công với Deutsche Ecke
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center justify-center"
            >
              Liên Hệ Tư Vấn
            </a>
            <a
              href="/courses"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
            >
              Xem Khóa Học
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NhanSuPage;