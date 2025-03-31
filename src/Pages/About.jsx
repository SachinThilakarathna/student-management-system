import Body from "../Components/Body/Body";
import Homepagefooter from "../Components/Footer/Homepagefooter";
import Header from "../Components/Header/Header";

function About() {
  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('section-background.jpg')" }}
      >
        <Body bodyname="About">
          <div className="max-w-4xl mx-auto pt-10">
            <section className="mb-22  p-6 rounded-lg shadow-lg mx-5  ">
              <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-[#fefcff] mb-6">About Our Student Management System</h2>
              <p className="text-base md:text-lg lg:text-1xl text-gray-300 leading-relaxed">
                "The Student Management System (SMS) aims to simplify student
                registrations, track academic progress, and maintain all student
                details efficiently. It serves as a digital solution to replace the
                outdated paper-based system, enhancing administrative workflow and
                ensuring real-time data management."
              </p>
            </section>
            <section className="bg-[#9e9e9e5b] p-6 rounded-lg shadow-lg ">
              <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-[#ffffff] mb-6">Our Vision</h2>
              <p className="text-base md:text-lg lg:text-1xl  text-[#ffffff] leading-relaxed">
                "To provide an efficient, user-friendly, and cloud-based solution
                for managing student data, making administrative processes seamless,
                and empowering the Department of Software Engineering at Akura with
                accurate and real-time information."
              </p>
            </section>
          </div>
        </Body>
      </div>
      <Homepagefooter/>

    </>
  );
}

export default About;
