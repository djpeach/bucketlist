//
//  LoginView.swift
//  ios-client
//
//  Created by Daniel Peach on 9/30/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import UIKit

class LoginView: UIView {
    var delegate: UnAuthDelegate?
    
    let errorText: UILabel = {
        let label = UILabel()
        label.textColor = .systemRed
        label.textAlignment = .center
        return label
    }()
    
    let emailField: UITextField = {
        let field = UITextField()
        field.keyboardType = .emailAddress
        field.autocapitalizationType = .none
        field.backgroundColor = .white
        field.borderStyle = .roundedRect
        field.placeholder = "Email"
        return field
    }()
    
    let password: UITextField = {
        let field = UITextField()
        field.keyboardType = .asciiCapable
        field.isSecureTextEntry = true
        field.autocapitalizationType = .none
        field.backgroundColor = .white
        field.borderStyle = .roundedRect
        field.placeholder = "Password"
        return field
    }()
    
    let loginBtn: UIButton = {
        let btn = UIButton(type: UIButton.ButtonType.system)
        btn.backgroundColor = .white
        btn.clipsToBounds = true
        btn.layer.cornerRadius = 4
        btn.setTitle("Login", for: .normal)
        btn.addTarget(self, action: #selector(login), for: .touchUpInside)
        btn.translatesAutoresizingMaskIntoConstraints = false
        return btn
    }()
    
    let switchToRegisterBtn: UIButton = {
        let btn = UIButton(type: UIButton.ButtonType.system)
        let attributedTitle = NSMutableAttributedString(string: "Need an account? ", attributes: [NSMutableAttributedString.Key.foregroundColor: UIColor.lightGray])
        attributedTitle.append(NSAttributedString(string: "Register", attributes: [NSAttributedString.Key.foregroundColor: UIColor.systemBlue]))
        btn.clipsToBounds = true
        btn.layer.cornerRadius = 4
        btn.setAttributedTitle(attributedTitle, for: .normal)
        btn.addTarget(self, action: #selector(showRegistration), for: .touchUpInside)
        btn.translatesAutoresizingMaskIntoConstraints = false
        return btn
    }()
    
    @objc private func showRegistration() {
        delegate?.showRegistration()
    }
    
    @objc private func login() {
        guard let emailText = emailField.text else { return }
        guard let passwordText = password.text else { return }
        
        errorText.text = ""
        delegate?.login(withEmail: emailText, withPassword: passwordText) { err in
            if let e = err {
                self.errorText.text = e
            }
        }
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = UIColor(white: 40, alpha: 0.01)
        
        addLoginForm()
    }
    
    private func addLoginForm() {
        let stack = UIStackView(arrangedSubviews: [errorText, emailField, password, loginBtn, switchToRegisterBtn])
        
        stack.distribution = .fillEqually
        stack.spacing = 10
        stack.axis = .vertical
        
        addSubview(stack)
        stack.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            stack.centerXAnchor.constraint(equalTo: safeAreaLayoutGuide.centerXAnchor),
            stack.centerYAnchor.constraint(equalTo: safeAreaLayoutGuide.centerYAnchor),
            stack.widthAnchor.constraint(equalTo: safeAreaLayoutGuide.widthAnchor, multiplier: 0.8)
        ])
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
