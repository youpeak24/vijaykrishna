import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Chatbot from './Chatbot';
import { chatConfig } from './chatConfig';

/** Floating AI assistant. Must be rendered inside the router (it follows the current page and navigates in-app). */
const ChatAssistant: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return <Chatbot config={chatConfig} page={pathname} onNavigate={(path) => navigate(path)} />;
};

export default ChatAssistant;
