export const orgChartData = {
  id: "root",
  name: "President",
  person: "Acharya Devakinandan Das",
  title: "Vrindavan Chandrodaya Mandir",
  avatar: "https://i.pravatar.cc/150?img=60",
  children: [
    {
      id: "sa1",
      name: "Super Admin",
      person: "Amit Tiwari",
      title: "IT & Systems Head",
      avatar: "https://i.pravatar.cc/150?img=15",
      children: [
        {
          id: "d1",
          name: "Department Admin",
          person: "Rajesh Kumar",
          title: "Construction",
          avatar: "https://i.pravatar.cc/150?img=12",
          children: [
            { id: "e1", name: "Employee", person: "Manoj Pandey", title: "Site Supervisor", avatar: "https://i.pravatar.cc/150?img=8", children: [] },
          ],
        },
        {
          id: "d2",
          name: "Department Admin",
          person: "Suresh Chandra",
          title: "Security",
          avatar: "https://i.pravatar.cc/150?img=51",
          children: [
            { id: "e2", name: "Employee", person: "Priya Singh", title: "Access Control", avatar: "https://i.pravatar.cc/150?img=44", children: [] },
          ],
        },
        {
          id: "d3",
          name: "Department Admin",
          person: "Anjali Verma",
          title: "HR",
          avatar: "https://i.pravatar.cc/150?img=32",
          children: [
            { id: "e3", name: "Employee", person: "Neha Sharma", title: "IT Support", avatar: "https://i.pravatar.cc/150?img=47", children: [] },
          ],
        },
        {
          id: "d4",
          name: "Department Admin",
          person: "Kavita Joshi",
          title: "Events",
          avatar: "https://i.pravatar.cc/150?img=29",
          children: [],
        },
      ],
    },
  ],
};