//팀명
//팀사진
//현재 대화중인 내용중 1줄
//채팅 테이블의 id값

//_id --> 상대방 유저아이디
//user: { _id } --> 내 유저 아이디

const conversation = [
  {
    _id: "1eacf2ee-4952-4e91-9e08-07af287f8e5a",
    createdAt: "2019-06-02T08:52:02.664Z",
    text: "저는윤민수라고해요",
    user: {
      _id: 1
    }
  },
  {
    _id: "c2c0ea3e-5ff4-4aba-ae78-729ad3fa4ff2",
    createdAt: "2019-06-02T08:51:59.003Z",
    text: "저는윤민수라고해요",
    user: {
      _id: 1
    }
  },
  {
    _id: "da8e0027-fb3b-4c46-8f8d-3443a75e2198",
    createdAt: "2019-06-02T08:51:53.502Z",
    text: "안녕하세요",
    user: {
      _id: 1
    }
  },
  {
    _id: "d80461a2-6f92-451b-b548-175e6c86828b",
    createdAt: "2019-06-02T08:51:48.665Z",
    text: "안녕?",
    user: {
      _id: 1
    }
  }
];

//상대방 idx
//팀명(상대방 idx에 해당하는 팀명)
//대화내용
//상대방 팀사진

const fakeListBox = [
  {
    //senderTeamID 저장
    idx: 1,
    teamName: "옆집누나들",
    conversation: conversation,
    avatarURL:
      "https://images.unsplash.com/photo-1529903384028-929ae5dccdf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
  },
  {
    idx: 2,
    teamName: "어디서본것같은여자들",
    conversation: conversation,
    avatarURL:
      "https://images.unsplash.com/photo-1498661367879-c2085689eed4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
  },
  {
    idx: 3,
    teamName: "중독녀",
    conversation: conversation,
    avatarURL:
      "https://images.unsplash.com/photo-1543159115-248bb0378274?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
  },
  {
    idx: 4,
    teamName: "돌아와요부산항에",
    conversation: conversation,
    avatarURL:
      "https://images.unsplash.com/photo-1525222285365-d6bfe94ec598?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"
  },
  {
    idx: 5,
    teamName: "트와이스",
    conversation: conversation,
    avatarURL:
      "https://images.unsplash.com/photo-1528165712023-32da4526b615?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"
  },
  {
    idx: 6,
    teamName: "처녀시대",
    conversation: conversation,
    avatarURL:
      "https://images.unsplash.com/photo-1503532036150-0266dd2f0969?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"
  },
  {
    idx: 7,
    teamName: "아프리카녀",
    conversation: conversation,
    avatarURL:
      "https://images.unsplash.com/photo-1493655430214-3dd7718460bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
  },
  {
    idx: 8,
    teamName: "천호동마담뻉덕",
    conversation: conversation,
    avatarURL:
      "https://images.unsplash.com/photo-1518605360659-2aa9659ef66d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"
  }
];

export default fakeListBox;
