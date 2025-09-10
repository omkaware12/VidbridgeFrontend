import { Mail, ListTodo, FileText, BarChart2, Bell, PieChart } from "lucide-react";

export default function ProductivitySection() {
  const features = [
    {
      icon: <Mail className="w-6 h-6 text-white" />,
      title: "Real-time Messaging",
      description:
        "Instantly communicate with your team, ensuring swift decision-making and seamless collaboration on project tasks and updates.",
    },
    {
      icon: <ListTodo className="w-6 h-6 text-white" />,
      title: "Task Management",
      description:
        "Organize and prioritize tasks effectively, assigning responsibilities and tracking progress to keep projects on schedule and within scope.",
    },
    {
      icon: <FileText className="w-6 h-6 text-white" />,
      title: "File Sharing",
      description:
        "Share documents, images, and other files effortlessly within your team, enabling easy access to project resources and materials.",
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-white" />,
      title: "Real-time Insights",
      description:
        "Gain actionable insights instantly with real-time data analysis and visualization.",
    },
    {
      icon: <Bell className="w-6 h-6 text-white" />,
      title: "Smart Notifications",
      description:
        "Stay informed about project updates and important discussions without being overwhelmed, thanks to customizable notification settings.",
    },
    {
      icon: <PieChart className="w-6 h-6 text-white" />,
      title: "Team Analytics",
      description:
        "Gain insights into team performance and communication trends with built-in analytics, empowering you to optimize workflows and enhance productivity.",
    },
  ];

  return (
    <section className="bg-black text-white py-20 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Left Content (Sticky) */}
        <div className="md:sticky md:top-24 self-start">
          <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-sm mb-6 font-roboto">
            Productivity
          </div>
          <h2 className="text-3xl md:text-3xl font-medium mb-4 font-roboto">
            Supercharge Team Productivity
          </h2>
          <p className="text-gray-300 mb-6 max-w-sm font-roboto">
            Keep your team focused and productive as they collaborate on building and shipping products swiftly.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-black px-4 py-1 rounded-full font-light hover:bg-gray-200 font-roboto">
              Get started
            </button>
            <button className="border border-white px-4 py-1 rounded-full font-light hover:bg-white hover:text-black font-roboto">
              See more
            </button>
          </div>
        </div>

        {/* Right Features (Scrollable) */}
        <div className="space-y-6 font-roboto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 border border-white/20 rounded-lg hover:bg-white/5 transition"
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
