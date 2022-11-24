import Messages from "./../models/message.model.js";

export const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.send("Message saved successfully ");
    }
    return res.send("Failed to add message to the database");
  } catch (error) {
    next();
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.send(projectedMessages);
  } catch (error) {
    next(error);
  }
};
