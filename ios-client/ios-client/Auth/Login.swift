//
//  Login.swift
//  MyHome
//
//  Created by Daniel Peach on 10/6/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import UIKit
import JGProgressHUD

private let textFieldHeight = 50

class Login: AuthView {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = .systemGray3
        buildView()
    }
    
    private func buildView() {
        let stack = UIStackView(arrangedSubviews: [emailField, passwordField, loginButton])
        stack.axis = .vertical
        stack.spacing = 15
        stack.distribution = .fillEqually
        
        addSubViews(views: [title, stack, switchToRegisterBtn])
        stack.centerView()
        let stackHeight: CGFloat = CGFloat(stack.arrangedSubviews.count * textFieldHeight) + CGFloat(stack.arrangedSubviews.count - 1) * stack.spacing
        stack.setSize(width: 300, height: stackHeight)
        title.centerViewX()
        title.anchor(top: safeTopAnchor, leading: safeLeadingAnchor, bottom: stack.safeTopAnchor, trailing: safeTrailingAnchor, padding: .init(top: 120, left: 0, bottom: 0, right: 0))
        switchToRegisterBtn.centerViewX()
        switchToRegisterBtn.anchor(top: nil, leading: nil, bottom: safeBottomAnchor, trailing: nil, padding: .init(top: 0, left: 32, bottom: 64, right: 32))
        switchToRegisterBtn.setSize(width: 300, height: 30)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    // MARK: Components
    let title: UITextView = {
        let text = UITextView()
        text.text = "Login"
        text.font = .boldSystemFont(ofSize: 36)
        text.textAlignment = .center
        text.backgroundColor = .systemGray3
        return text
    }()
    
    let emailField: UITextField = {
        let tf = UITextField()
        tf.placeholder = "Email"
        tf.keyboardType = .emailAddress
        tf.borderStyle = .roundedRect
        tf.backgroundColor = .systemBackground
        tf.font = .systemFont(ofSize: 18)
        tf.addTarget(self, action: #selector(checkValidText), for: .editingChanged)
        tf.autocapitalizationType = .none
        return tf
    }()
    
    let passwordField: UITextField = {
        let tf = UITextField()
        tf.placeholder = "Password"
        tf.keyboardType = .asciiCapable
        tf.isSecureTextEntry = true
        tf.borderStyle = .roundedRect
        tf.backgroundColor = .systemBackground
        tf.font = .systemFont(ofSize: 18)
        tf.addTarget(self, action: #selector(checkValidText), for: .editingChanged)
        tf.autocorrectionType = .no
        return tf
    }()
    
    let loginButton: UIButton = {
        let btn = UIButton(type: UIButton.ButtonType.roundedRect)
        btn.backgroundColor = .systemBackground
        btn.isEnabled = false
        btn.setTitle("Login", for: .normal)
        btn.addTarget(self, action: #selector(didClickLogin), for: .touchUpInside)
        btn.clipsToBounds = true
        btn.layer.cornerRadius = 4
        return btn
    }()
    
    let switchToRegisterBtn: UIButton = {
        let btn = UIButton(type: UIButton.ButtonType.system)
        btn.setTitle("Need an account? Register instead", for: .normal)
        btn.addTarget(self, action: #selector(didClickSwitchToRegister), for: .touchUpInside)
        return btn
    }()
    
    @objc func didClickLogin() {
        let hud = JGProgressHUD(style: .dark)
        hud.textLabel.text = "Authorizing..."
        hud.show(in: self)
        hud.backgroundColor = UIColor.systemGray.withAlphaComponent(0.6)
        guard let email = emailField.text else { return }
        guard let password = passwordField.text else { return }
        delegate?.login(email: email, password: password) { res, err in
            if let err = err {
                hud.indicatorView = JGProgressHUDErrorIndicatorView()
                hud.textLabel.text = err.localizedDescription
                hud.tapOnHUDViewBlock = { hud in
                    hud.dismiss(animated: false)
                }
                hud.tapOutsideBlock = { hud in
                    hud.dismiss(animated: false)
                }
                return
            }
            
            hud.indicatorView = JGProgressHUDSuccessIndicatorView()
            hud.textLabel.text = "Authorized!"
            hud.dismiss(afterDelay: 1.5, animated: true)
            DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                let sceneDelegate = self.window?.windowScene?.delegate as! SceneDelegate
                sceneDelegate.coordinator?.authStateChanged()
            }
        }
    }
    
    @objc func didClickSwitchToRegister() {
        delegate?.switchToRegister()
    }
    
    @objc func checkValidText() {
        guard let email = emailField.text else { return }
        guard let password = passwordField.text else { return }
        if email != "" && password != "" {
            loginButton.isEnabled = true
        } else {
            loginButton.isEnabled = false
        }
    }
}
